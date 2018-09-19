import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_ERRORS,
  CLEAR_USER_ERRORS
} from "../actions/session_actions";

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case CLEAR_USER_ERRORS:
    case RECEIVE_CURRENT_USER:
      return [];
    case RECEIVE_USER_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default sessionErrorsReducer;
