'use strict';
import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root";

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser },
      },
      session: { id: window.currentUser.id },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  const rootEl = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, rootEl);
  // for testing only - to be removed!
  window.dispatch = store.dispatch;
});

// for testing only - to be removed!
import * as groupApiUtil from "./util/group_api_util";
import {
  fetchGroup,
  fetchGroups,
  createGroup,
  joinGroup,
  leaveGroup,
} from "./actions/group_actions";
window.groupApiUtil = groupApiUtil;
window.fetchGroup = fetchGroup;
window.fetchGroups = fetchGroups;
window.createGroup = createGroup;
window.joinGroup = joinGroup;
window.leaveGroup = leaveGroup;
