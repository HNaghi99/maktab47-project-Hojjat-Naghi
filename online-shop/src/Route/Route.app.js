import React, { Component } from "react";
// import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/Private.Route";
import PublicRoute from "./components/Public.Route";
import {
  Cart,
  Dashboard,
  Finalize,
  Home,
  List,
  Login,
  Payment,
  ProductDetail,
  ShoppingResult,
  Orders,
  Wares,
  Stock,
} from "../pages/Index";
class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={false} component={List} path="/list" exact />
          <PublicRoute
            restricted={false}
            component={ProductDetail}
            path="/product-detail"
            exact
          />
          <PublicRoute restricted={false} component={Cart} path="/cart" exact />
          {
            "TODO: correction the good condition for 3 payment,shoppingResult,finalize"
          }
          <PublicRoute
            restricted={false}
            component={ShoppingResult}
            path="/shopping-result"
            exact
          />
          <PublicRoute
            restricted={false}
            component={Payment}
            path="/payment"
            exact
          />
          <PublicRoute
            restricted={false}
            component={Finalize}
            path="/finalize"
            exact
          />
          <PublicRoute
            restricted={true}
            component={Login}
            path="/login"
            exact
          />
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          {/* <PrivateRoute component={Stock} path="/dashboard/stock" exact />
          <PrivateRoute component={Orders} path="/dashboard/orders" exact /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
