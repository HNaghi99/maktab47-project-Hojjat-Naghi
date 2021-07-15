import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getProductWithId } from "../../api/Api";
import { Grid } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import "./style.css";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ReactImageZoom from "react-image-zoom";
import { cartAction } from "../../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [productDetail, setProductDetail] = React.useState({});
  const [stock, setStock] = React.useState(1);
  const zoomProps = {
    width: 250,
    height: 250,
    zoomWidth: 300,
    zoomPosition: "original",
  };
  React.useEffect(() => {
    const productData = async () => {
      return getProductWithId(productId);
    };
    const product = productData();
    product.then((product) => {
      setProductDetail(product);
    });
  }, [productId]);
  const addToCartHandler = () => {
    const productData = {
      name: productDetail.name,
      price: productDetail.price,
      id: productDetail.id,
      stock: stock,
    };
    dispatch(cartAction.addToCart(productData));
  };
  const stockChangeHandler = (e) => {
    setStock(e.target.value);
  };
  console.log("id of page is ", productId);
  return (
    <main className="product-details-page">
      <Grid container>
        <Grid item sm={6} xs={12} className="image-of-product">
          <ReactImageZoom
            {...zoomProps}
            img={`http://localhost:3004${productDetail.image}`}
          />
          {/* <img src={`http://localhost:3004${productDetail.image}`} /> */}
        </Grid>
        <Grid item sm={6} xs={12} className="product-information">
          <div>
            <h3>{productDetail.name}</h3>
            <div className="product-direction">
              <Breadcrumbs
                separator={<NavigateBeforeIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link className="bread-crumb-link" to={`/`}>
                  {productDetail.header}
                </Link>
                <Link
                  className="bread-crumb-link"
                  to={`/groups/${productDetail.group}`}
                >
                  {productDetail.group}
                </Link>
                <Typography color="textPrimary">
                  {productDetail.name}
                </Typography>
              </Breadcrumbs>
            </div>
            <h3 dir="rtl">{productDetail.price}تومان</h3>
            <div className="add-to-cart">
              <input
                type="number"
                min={1}
                value={stock}
                onChange={stockChangeHandler}
                className="input-number"
              />
              <Button
                variant="contained"
                className="add-to-cart-btn"
                startIcon={<AddCircleIcon />}
                onClick={addToCartHandler}
              >
                افزودن به سبد خرید
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item sm={12}>
          {productDetail.description}
        </Grid>
      </Grid>
    </main>
  );
}
export { ProductDetail };
