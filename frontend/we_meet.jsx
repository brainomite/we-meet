import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const rootEl = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, rootEl);

  // *** for testing only - to be removed! ***
  window.getState = store.getState;
  window.dispatch = store.dispatch;
});


// for testing only - to be removed!
import * as sessionApiUtil from './util/session_api_util';
import { login, signup, logout } from './actions/session_actions';
window.sessionApiUtil = sessionApiUtil;
window.login = login;
window.signup = signup;
window.logout = logout;
