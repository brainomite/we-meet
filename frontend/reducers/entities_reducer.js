import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import groupReducer from './groups_reducer';
import groupUsersReducer from './group_users_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  groups: groupReducer,
  groupUsers: groupUsersReducer
});

export default entitiesReducer;
