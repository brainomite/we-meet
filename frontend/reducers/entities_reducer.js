import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import groupReducer from './groups_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  groups: groupReducer
});

export default entitiesReducer;
