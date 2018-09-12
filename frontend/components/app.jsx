import React from 'react';
import NavBar from './nav_bar/nav_bar_container';
import { Switch, Route } from 'react-router-dom';
import Splash from './splash';
import SignupForm from './signup_form';
import LoginForm from './login_form';
import AuthRoute from '../util/route_util';
import Footer from './footer';

const App = () => (
  <div>
    <NavBar />
      <Switch>
        <Route path="/" exact component={Splash} />
        <AuthRoute path="/signup" component={SignupForm} />
        <AuthRoute path="/login" component={LoginForm} />
      </Switch>
    <Footer />
  </div>
);

export default App;
