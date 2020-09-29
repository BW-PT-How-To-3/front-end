import React from "react";
import { Route, Redirect } from "react-router-dom";

// rest operator(looks a lot spread operator)
const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = window.localStorage.getItem("token");
  console.log("Token: ", token);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          console.log("I am here");
          return <Component {...props} />;
        } else {
          console.log("I am here");
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
