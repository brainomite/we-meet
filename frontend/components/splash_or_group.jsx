import React from "react";
import { connect } from "react-redux";
import Splash from "./splash";
import GroupIndex from "./group/group_index";

const SplashOrGroup = props => {
  if (props.currentUser) {
    return <GroupIndex history={props.history}/>;
  } else {
    return <Splash />;
  }
};

const msp = ({ entities, session }) => ({
  currentUser: entities.users[session.id],
});

export default connect(msp)(SplashOrGroup);
