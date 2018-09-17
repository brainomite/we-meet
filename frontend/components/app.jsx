import React from "react";
import NavBar from "./nav_bar/nav_bar_container";
import { Switch, Route } from "react-router-dom";
import Splash from "./splash";
import SignupForm from "./signup_form/signup_form_container";
import LoginForm from "./login_form/login_form_container";
import AvatarForm from "./avatar_form/avatar_form_container";
import AuthRoute from "../util/route_util";
import Footer from "./footer";
import Modal from "./modal";

const App = () => {
  const mainView = <h1>Welcome!</h1>;
  return (
    <div>
      <Modal />
      <NavBar />
      <Switch>
        <Route path="/" exact component={Splash} />
        <AuthRoute path="/signup" component={SignupForm} />
        <AuthRoute path="/login" component={LoginForm} />
        <AuthRoute path="/welcome" requireLogin component={AvatarForm} />
        <Route
          path="/menutest"
          exact
          component={() => <main>{mainView}</main>}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
