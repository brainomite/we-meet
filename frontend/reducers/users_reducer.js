import merge from 'lodash/merge';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions.js';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.user.id]: action.user});
    default:
      return state;
  }
};

export default usersReducer;
