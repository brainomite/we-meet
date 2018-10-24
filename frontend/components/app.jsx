import React from "react";
import NavBar from "./nav_bar/nav_bar_container";
import { Switch, Route } from "react-router-dom";
import SignupForm from "./signup_form/signup_form_container";
import LoginForm from "./login_form/login_form_container";
import AvatarForm from "./avatar_form/avatar_form_container";
import GroupShow from "./group/group_show_container";
import AuthRoute from "../util/route_util";
import GroupCreateForm from "./group/group_create/group_create_form_container";
import GroupEdit from './group/group_create/group_edit_form_container';
import Footer from "./footer";
import Modal from "./modal";
import SplashOrGroup from "./splash_or_group";

const App = () => {
  const mainView = <h1>Welcome!</h1>;
  return (
    <div>
      <Modal />
      <NavBar />
      <Switch>
        <AuthRoute path="/signup" component={SignupForm} />
        <AuthRoute path="/login" component={LoginForm} />
        <AuthRoute path="/welcome" requireLogin component={AvatarForm} />
        <Route path="/create" component={GroupCreateForm} />
        <Route path="/group/:groupId/edit" component={GroupEdit} />
        <Route path="/group/:groupId" component={GroupShow} />
        <Route path="/" component={SplashOrGroup} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
