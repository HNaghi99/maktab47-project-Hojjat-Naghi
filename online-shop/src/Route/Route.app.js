import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/Private.Route";
import PublicRoute from "./components/Public.Route";
import {
  Cart,
  Finalize,
  Home,
  List,
  Login,
  NotFound,
  ProductDetail,
  ShoppingResult,
} from "../pages/Index";
class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute
            restricted={false}
            component={List}
            path="/groups/:groupName"
          />
          <PublicRoute
            restricted={false}
            component={ProductDetail}
            path="/product-details/:productId"
            exact
          />
          <PublicRoute restricted={false} component={Cart} path="/cart" exact />
          {
            "TODO: correction the good condition for 3 payment,shoppingResult,finalize"
          }
          <PublicRoute
            restricted={false}
            component={ShoppingResult}
            path="/shopping-result/:shoppingStatus"
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
          <PrivateRoute path="/dashboard" exact />
          <Route to="not-found">
            <NotFound />
          </Route>
          <Route>
            <Redirect to="not-found"></Redirect>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
