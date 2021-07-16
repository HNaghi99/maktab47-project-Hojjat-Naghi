import { useParams } from "react-router";
import { useEffect } from "react";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../redux/reducer/cartReducer";
import { postOrder } from "../../api/Api";
import styles from "./style.module.css";
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
  console.log("cart is ", JSON.stringify(cart));
  useEffect(() => {
    if (shoppingStatus === "successful") {
      console.log("family is:", family);
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
      postOrder(formData).then(() => {
        dispatch(cartAction.clearCart());
        console.log(
          "your order is successfully",
          new Date().toLocaleDateString("fa-IR")
        );
      });
    }
  }, []);
  return (
    <>
      <h2 className={styles.header}>نتیجه پرداخت</h2>
      <main className={`${styles.shoppingStatus}`}>
        {shoppingStatus === "successful" ? (
          <>
            <CheckCircleRoundedIcon
              className={`${styles.icon} ${styles.success}`}
            />
            <p className={`${styles.statusText}`}>
              با تشکر از پرداخت شما سفارش شما ثبت شده و جهت هماهنگی ارسال با شما
              تماس گرفته خواهد شد.
            </p>
          </>
        ) : (
          <>
            <CancelRoundedIcon
              className={`${styles.icon} ${styles.unsuccess}`}
            />
            <p className={`${styles.statusText}`}>
              پرداخت موفقیت آمیز نبود سفارش شما در انتظار پرداخت است.
            </p>
          </>
        )}
      </main>
    </>
  );
}
export { ShoppingResult };
