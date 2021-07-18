import styles from "./style.module.css";
import { useSelector } from "react-redux";
export function Loader() {
  const loadStatus = useSelector((state) => state.loader.loadStatus);
  return (
    <div className={loadStatus ? styles.loading : styles.hiding}>
      <div></div>
      <div></div>
    </div>
  );
}
