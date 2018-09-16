import React from "react";
import { connect } from "react-redux";
import { withRouter, Route, Redirect } from "react-router-dom";

const AuthRoute = ({
  component: Component,
  path,
  loggedIn,
  exact,
  requireLogin
}) => {
  if (requireLogin) {
    return (
      <Route
        path={path}
        exact={exact}
        render={props =>
          loggedIn ? <Component {...props} /> : <Redirect to="/signup" />
        }
      />
    );
  } else {
    return (
      <Route
        path={path}
        exact={exact}
        render={props =>
          !loggedIn ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
};

const mapStateToProps = state => {
  return { loggedIn: Boolean(state.session.id) };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(AuthRoute)
);
