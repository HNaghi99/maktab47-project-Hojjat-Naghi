import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../../utils/IsLogin";
import { Main } from "../../layout/Main";
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) => {
        if (isLogin === false && restricted === true)
          return <Component {...props} />;
        else {
          return isLogin && restricted ? (
            <Redirect to="/dashboard" />
          ) : (
            <Main isPublic={true}>
              <Component {...props} />
            </Main>
          );
        }
      }}
    />
  );
};

export default PublicRoute;
