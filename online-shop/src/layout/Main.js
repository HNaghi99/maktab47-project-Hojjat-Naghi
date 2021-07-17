import { Component } from "react";
import PrivateHeader from "./components/PrivateHeader/PrivateHeader";
import PublicHeader from "./components/PublicHeader/PublicHeader";
import styles from "./style.module.css";
import { useSelector } from "react-redux";
function Main(props) {
  const loadStatus = useSelector((state) => state.loader.loadStatus);
  return (
    <>
      {props.isPublic ? (
        <PublicHeader className={loadStatus ? styles.hiding : styles.showing} />
      ) : (
        <PrivateHeader
          className={loadStatus ? styles.hiding : styles.showing}
        />
      )}
      <div className={loadStatus ? styles.loading : styles.hiding}>
        <div></div>
        <div></div>
      </div>
      {props.children}
    </>
  );
}
export { Main };
