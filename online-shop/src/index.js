import React from "react";
import ReactDOM from "react-dom";
import { Home } from "./pages/Index";
import "../src/asset/css-normalize/normalize.css";
import Router from "./Route/Route.app";
import PublicHeader from "./layout/components/PublicHeader";
import PrivateHeader from "./layout/components/PrivateHeader";
import { Main } from "./layout/Main";
import reportWebVitals from "./reportWebVitals";
ReactDOM.render(<Router />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
