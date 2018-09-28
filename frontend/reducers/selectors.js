export const selectCurrentUser = ({ entities, session }) => {
  return entities.users[session.id];
};

export const selectIsLoggedIn = state => {
  return Boolean(selectCurrentUser(state));
};

export const selectUserGroups = state => {
  const groupArray = [];
  const groups = state.entities.groups;
  if (selectIsLoggedIn(state)) {
    const curUser = selectCurrentUser(state);
    curUser.group_ids.forEach(groupId => {
      if (groups[groupId]) groupArray.push(groups[groupId]);
    });
  }
  return groupArray;
};
