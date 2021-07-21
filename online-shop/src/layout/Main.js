import PrivateHeader from "./components/PrivateHeader/PrivateHeader";
import PublicHeader from "./components/PublicHeader/PublicHeader";
import { Loader } from "./components/Loader/Loader";
import styles from "./style.module.css";
import { useSelector } from "react-redux";
import RTLComponent from "../Theme/RTLComponent";
function Main(props) {
  const loadStatus = useSelector((state) => state.loader.loadStatus);
  return (
    <>
      <RTLComponent>
        {props.isPublic ? <PublicHeader /> : <PrivateHeader />}
        <Loader />
        {props.children}
      </RTLComponent>
    </>
  );
}
export { Main };
