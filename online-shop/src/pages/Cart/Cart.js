import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector } from "react-redux";
import { cartAction } from "../../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
const columns = [
  {
    id: "product",
    label: "کالا",
    // minWidth: 170,
  },
  {
    id: "price",
    label: "قیمت",
    // minWidth: 100,
  },
  {
    id: "stock",
    label: "تعداد",
    // minWidth: 170,
  },
  {
    id: "buttons",
    label: "",
    // minWidth: 170,
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
  },
  container: {
    maxHeight: 440,
  },
  button: {
    margin: theme.spacing(1),
  },
}));
function Cart(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartProductsArray);
  console.log("CART IS:", cartProducts, JSON.stringify(cartProducts));
  const total = useSelector((state) => state.cart.total);
  //   const [cartProducts, setCartProducts] = React.useState(fakeCart);
  //   const [total, setTotal] = React.useState(0);
  const deleteProductHandler = (productData) => {
    dispatch(cartAction.deleteFromCart(productData));
  };
  const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
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
  return (
    <main>
      <div className="cart-title-container">
        <h2 className="cart-title">سبد خرید</h2>
      </div>
      {!cartProducts.length ? (
        <h3 className="cart-message">محصولی برای نمایش وجود ندارد</h3>
      ) : (
        <div className="cart-table">
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead style={{ backgroundColor: "black", color: "white" }}>
                  <TableRow className="MuiPaper-elevation20 MuiTab-textColorInherit">
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={"center"}
                        style={{
                          minWidth: column.minWidth,
                          fontWeight: "bold",
                          fontSize: "larger",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartProducts.map((product, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{product.product}</TableCell>
                        <TableCell align="center" className="cell">
                          {insertrialcamma(e2p(JSON.stringify(product.price)))}
                        </TableCell>
                        <TableCell align="center" className="cell">
                          {e2p(JSON.stringify(product.number))}
                        </TableCell>
                        <TableCell align="center" className="cell">
                          <Button
                            variant="contained"
                            color="secondary"
                            className={props.class}
                            startIcon={<DeleteIcon />}
                            onClick={() =>
                              deleteProductHandler({
                                id: product.id,
                                number: product.number,
                                price: product.price,
                              })
                            }
                          >
                            حذف
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <div className="price-and-buy">
            <h3>جمع:{insertrialcamma(e2p(JSON.stringify(total)))} تومان</h3>
            <Box component="div" className="cart-finalize">
              <Box
                component={Link}
                to="/finalize"
                className="cart-finalize-link"
              >
                نهایی کردن سبد خرید
              </Box>
            </Box>
          </div>
        </div>
      )}
    </main>
  );
}
export { Cart };
