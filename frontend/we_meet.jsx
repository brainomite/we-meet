import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store'

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const root = document.getElementById('root');
  ReactDOM.render(<h1>Welcome to weMeet</h1>, root);

  // *** for testing only - to be removed! ***
  window.getState = store.getState;
  window.dispatch = store.dispatch;
});


// for testing only - to be removed!
import * as sessionApiUtil from './util/session_api_util';
import { login, signup, logout } from './actions/session_actions';
window.sessionApiUtil = sessionApiUtil;
window.login = login
window.signup = signup
window.logout = logout
