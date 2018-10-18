import merge from "lodash/merge";
import { RECEIVE_GROUP } from "../actions/group_actions";

export default function groupUsersReducer(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GROUP:
      return action.payload.group_users;
    default:
      return state;
  }
}
