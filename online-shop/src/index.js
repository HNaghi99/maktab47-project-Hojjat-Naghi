import React from "react";
import ReactDOM from "react-dom";
import { Home } from "./pages/Index";
import "../src/asset/css-normalize/normalize.css";
import Router from "./Route/Route.app";
import PublicHeader from "./layout/components/PublicHeader/PublicHeader";
import PrivateHeader from "./layout/components/PrivateHeader/PrivateHeader";
import { Main } from "./layout/Main";
import { Login } from "./pages/Login/Login";
import reportWebVitals from "./reportWebVitals";
import { App } from "./App";
import { LoginPage } from "./pages/Login/Login";
import PublicRoute from "./Route/components/Public.Route";
ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
