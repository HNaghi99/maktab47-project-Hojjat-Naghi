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
import { cartAction } from "../../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import ReactImageMagnify from "react-image-magnify";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import { loaderAction } from "../../redux/reducer/loadReducer";
import { SnackbarProvider, useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
function ProductDetailElement() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [counter, setCounter] = React.useState(0);
  const loadStatus = useSelector((state) => state.loader.loadStatus);
  const cart = useSelector((state) => state.cart.cartProductsArray);
  const [productDetail, setProductDetail] = React.useState({
    price: "10000",
    description: "[]",
  });
  if (counter === 0) dispatch(loaderAction.displayLoader());
  const loadClass = loadStatus ? `hiding` : `showing`;
  const ContentClasses = `product-details-page ${loadClass}`;
  const [stock, setStock] = React.useState(1);
  const zoomProps = {
    width: 250,
    height: 250,
    zoomWidth: 300,
    zoomPosition: "original",
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(
      message,
      { variant },
      {
        TransitionComponent: Slide,
      }
    );
  };
  React.useEffect(() => {
    const productData = async () => {
      return getProductWithId(productId);
    };
    const product = productData();
    product.then((product) => {
      setProductDetail(product);
      setCounter(counter + 1);
      dispatch(loaderAction.hideLoader());
    });
  }, [productId]);
  const e2p = (s) => s.replace(/\d/g, (d) => "????????????????????"[d]);
  function insertrialcamma(n) {
    var m = "";
    for (var i = 0; i < n.length; i++) {
      var c = n.substr(n.length - i - 1, 1);
      if ((i % 3 == 0) & (i > 0)) {
        m = c + "," + m;
      } else {
        m = c + m;
      }
    }
    return m;
  }
  const addToCartHandler = () => {
    const productData = {
      name: productDetail.name,
      price: productDetail.price,
      id: productDetail.id,
      number: stock,
    };
    const productInCart = cart.filter((product) => product.id == productId);
    const stockOfProductInStore = +productDetail.stock;
    if (productInCart.length === 0) dispatch(cartAction.addToCart(productData));
    else {
      const addStock = +stock;
      const totalStock = productInCart[0].number + addStock;
      if (productInCart[0].number + addStock <= stockOfProductInStore)
        dispatch(cartAction.addToCart(productData));
      else handleClickVariant("?????????? ?????????? ?????????? ???? ???????????? ?????????? ??????", "error");
    }
  };
  const stockChangeHandler = (e) => {
    setStock(e.target.value);
  };

  return (
    <main className={ContentClasses}>
      <Grid container>
        <Grid item sm={6} xs={12} className="image-of-product">
          <div
            dir="ltr"
            style={{
              width: "300px",
              borderRadius: "9px",
              boxShadow:
                "0 14px 28px rgb(247 247 247 / 25%), 0 10px 10px rgb(93 93 93 / 22%)",
            }}
          >
            <ReactImageMagnify
              enlargedImagePosition="over"
              {...{
                smallImage: {
                  alt: "Product-Image",
                  isFluidWidth: true,
                  sizes:
                    "(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw",
                  src: `http://localhost:3004${productDetail.image}`,
                },
                largeImage: {
                  src: `http://localhost:3004${productDetail.image}`,
                  width: 750,
                  height: 750,
                },
              }}
            />
          </div>
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
                <Typography color="textPrimary" className="product-name">
                  {productDetail.name}
                </Typography>
              </Breadcrumbs>
            </div>
            <h3 dir="rtl">{insertrialcamma(e2p(productDetail.price))}??????????</h3>
            <div className="add-to-cart">
              <input
                type="number"
                min={1}
                max={productDetail.stock}
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
                ???????????? ???? ?????? ????????
              </Button>
            </div>
          </div>
        </Grid>

        <Grid item sm={12}>
          {/* {[ReactHtmlParser(JSON.parse(productDetail.description))]} */}
        </Grid>
      </Grid>
    </main>
  );
}
function TransitionRight(props) {
  return <Slide {...props} direction="left" />;
}
export function ProductDetail(props) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      TransitionComponent={TransitionRight}
    >
      <ProductDetailElement />
    </SnackbarProvider>
  );
}
