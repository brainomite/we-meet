import React from "react";
import { connect } from "react-redux";
import Splash from "./splash";
import GroupIndex from "./group/group_index";
import { getCurrentUser } from "../reducers/selectors";

const SplashOrGroup = props => {
  if (props.currentUser) {
    return <GroupIndex history={props.history} />;
  } else {
    return <Splash />;
  }
};

const msp = state => ({
  currentUser: getCurrentUser(state),
});

export default connect(msp)(SplashOrGroup);
