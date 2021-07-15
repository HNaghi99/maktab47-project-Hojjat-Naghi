import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Main } from "../../layout/Main";
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated === false && restricted === true)
          return <Component {...props} />;
        else {
          return isAuthenticated && restricted ? (
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
