import logo from "../../asset/image/not-found.png";
import styles from "./style.module.css";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
function NotFound(props) {
  return (
    <main className={styles.main}>
      <div>
        <div className={styles.imgContainer}>
          <img src={logo} className={styles.img} />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>
            صفحه ای که به دنبال آن بودید پیدا نشد
          </h1>
          <Box component={Link} to="/" className={styles.link}>
            بازگشت به صفحه اصلی
          </Box>
        </div>
      </div>
    </main>
  );
}
export { NotFound };
