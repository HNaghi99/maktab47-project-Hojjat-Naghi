import { Component } from "react";
import PrivateHeader from "./components/PrivateHeader/PrivateHeader";
import PublicHeader from "./components/PublicHeader/PublicHeader";
function Main(props) {
  return (
    <>
      {props.isPublic ? <PublicHeader /> : <PrivateHeader />}
      {props.children}
    </>
  );
}
export { Main };
