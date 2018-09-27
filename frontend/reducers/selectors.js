export const getCurrentUser = ({ entities, session }) => {
  return entities.users[session.id];
};

export const getIsLoggedIn = state => {
  return Boolean(getCurrentUser(state));
};

export const getUserGroups = state => {
  const groupArray = [];
  const groups = state.entities.groups;
  if (getIsLoggedIn(state)) {
    const curUser = getCurrentUser(state);
    curUser.group_ids.forEach(groupId => {
      if (groups[groupId]) groupArray.push(groups[groupId]);
    });
  }
  return groupArray;
};
