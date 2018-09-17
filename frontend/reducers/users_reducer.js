import merge from 'lodash/merge';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions.js';
import { RECEIVE_GROUP } from "../actions/group_actions";


const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.user.id]: action.user});
    case RECEIVE_GROUP:
      return merge({}, state, action.payload.users);
    default:
      return state;
  }
};

export default usersReducer;
