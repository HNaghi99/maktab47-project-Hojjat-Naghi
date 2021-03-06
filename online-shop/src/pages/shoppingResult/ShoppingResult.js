import { useParams } from "react-router";
import { useEffect } from "react";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../redux/reducer/cartReducer";
import {
  deleteProduct,
  getProductWithId,
  patchProduct,
  postOrder,
} from "../../api/Api";
import styles from "./style.module.css";
import { loaderAction } from "../../redux/reducer/loadReducer";
function ShoppingResult(props) {
  const { shoppingStatus } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartProductsArray);
  const amount = useSelector((state) => state.cart.total);
  const name = useSelector((state) => state.customer.name);
  const family = useSelector((state) => state.customer.family);
  const address = useSelector((state) => state.customer.address);
  const tel = useSelector((state) => state.customer.tel);
  const deliveryRequestTime = useSelector((state) => state.customer.date);
  const orderTime = useSelector((state) => state.customer.orderTime);
  useEffect(() => {
    if (shoppingStatus === "successful") {
      const formData = new FormData();
      formData.append("name", `${name} ${family}`);
      formData.append("address", address);
      formData.append("tel", tel);
      formData.append("amount", amount);
      formData.append("deliveryRequestTime", deliveryRequestTime);
      formData.append("deliveryStatus", "false");
      formData.append("OrderTime", orderTime);
      formData.append("deliveryTime", " ");
      formData.append("cart", JSON.stringify(cart));
      dispatch(loaderAction.displayLoader());
      postOrder(formData).then(() => {
        cart.forEach(async (product) => {
          const productData = await getProductWithId(product.id);
          const stockOfProduct = +productData.stock;
          if (stockOfProduct - product.number === 0) {
            await deleteProduct(product.id);
            console.log("products are deleted");
          } else {
            const formData = new FormData();
            formData.append("stock", stockOfProduct - product.number);
            await patchProduct(formData, product.id);
          }
        });
        dispatch(cartAction.clearCart());
        dispatch(loaderAction.hideLoader());
      });
    }
  }, []);
  return (
    <>
      <main>
        <div className={styles.titleContainer}>
          <h2 className={styles.header}>?????????? ????????????</h2>
        </div>
        <div className={`${styles.shoppingStatus}`}>
          {shoppingStatus === "successful" ? (
            <>
              <CheckCircleRoundedIcon
                className={`${styles.icon} ${styles.success}`}
              />
              <p className={`${styles.statusText}`}>
                ???? ???????? ???? ???????????? ?????? ?????????? ?????? ?????? ?????? ?? ?????? ?????????????? ?????????? ????
                ?????? ???????? ?????????? ?????????? ????.
              </p>
            </>
          ) : (
            <>
              <CancelRoundedIcon
                className={`${styles.icon} ${styles.unsuccess}`}
              />
              <p className={`${styles.statusText}`}>
                ???????????? ???????????? ???????? ???????? ?????????? ?????? ???? ???????????? ???????????? ??????.
              </p>
            </>
          )}
        </div>
      </main>
    </>
  );
}
export { ShoppingResult };
