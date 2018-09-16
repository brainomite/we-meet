import React from 'react';
import NavBar from './nav_bar/nav_bar_container';
import { Switch, Route } from 'react-router-dom';
import Splash from './splash';
import SignupForm from './signup_form/signup_form_container';
import LoginForm from './login_form/login_form_container';
import AvatarForm from './avatar_form/avatar_form_container';
import AuthRoute from '../util/route_util';
import Footer from './footer';

const App = () => (
  <div>
    <NavBar />
      <Switch>
        <Route path="/" exact component={Splash} />
        <AuthRoute path="/signup" component={SignupForm} />
        <AuthRoute path="/login" component={LoginForm} />
        <AuthRoute path="/welcome" requireLogin component={AvatarForm} />
      </Switch>
    <Footer />
  </div>
);

export default App;
