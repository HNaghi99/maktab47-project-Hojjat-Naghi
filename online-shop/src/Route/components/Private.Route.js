import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { IsLogin } from "../../utils/IsLogin";
import { Main } from "../../layout/Main";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = useContext(IsLogin).value;
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLogin ? (
          <Main isPublic={false}>{/* <Component {...props} /> */}</Main> //TODO:handle state passing by redux
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
