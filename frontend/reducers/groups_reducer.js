import { RECEIVE_GROUP, RECEIVE_GROUPS } from "../actions/group_actions";

export default function groupReducer(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    // case RECEIVE_GROUP:
    case RECEIVE_GROUPS:
      return action.groups;
    default:
      return state;
  }
}
