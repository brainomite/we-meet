import {
  RECEIVE_GROUP_ERRORS,
  RECEIVE_GROUP
} from '../actions/group_actions';

const groupErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GROUP:
      return [];
    case RECEIVE_GROUP_ERRORS:
      return action.errors;
    default:
      return state;
  }
};

export default groupErrorsReducer;
