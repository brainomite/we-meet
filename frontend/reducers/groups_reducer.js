import merge from "lodash/merge";
import { RECEIVE_GROUP, RECEIVE_GROUPS } from "../actions/group_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions.js";

export default function groupReducer(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GROUP:
      const newState = merge({}, state);
      // merge when merging arrays keeps the superset! Not appropriate here
      for (let key in action.payload.group) {
        if (action.payload.group.hasOwnProperty(key))
          newState[key] = action.payload.group[key];
      }
      return newState;
    case RECEIVE_GROUPS:
      return action.groups;
    case RECEIVE_CURRENT_USER:
      return merge({}, state, action.payload.groups);
    default:
      return state;
  }
}
