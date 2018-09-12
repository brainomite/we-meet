import React from 'react';
import NavBar from './nav_bar/nav_bar_container';
import { Switch, Route } from 'react-router-dom';
import Splash from './splash';
import SignupForm from './signup_form';

const App = () => (
  <div>
    <NavBar />
    <h1>Welcome to reactified we-meet</h1>
    <Switch>
      <Route path="/" exact component={Splash} />
      <Route path="/signup" component={SignupForm} />
    </Switch>
  </div>
);

export default App;
