import merge from "lodash/merge";

export const selectGroup = (state, groupId) => {
  const DEFAULT_GROUP = {
    name: "",
    description: "",
    group_user_ids: [],
    hometown: "",
    id: null,
    member_ids: [],
  };
  const originalGroup = state.entities.groups[groupId] || {};
  const newGroup = merge({}, DEFAULT_GROUP, originalGroup);
  newGroup.organizerIds = [];
  newGroup.group_user_ids.forEach(groupUserId => {
    const groupUser = state.entities.groupUsers[groupUserId];
    const isOrganizer = groupUser.member_type === 'Organizer';
    if (isOrganizer){
      newGroup.organizerIds.push(groupUser.user_id);
    }
    if (state.session.id === groupUser.user_id) newGroup.isMember = true;
    if (newGroup.isMember && isOrganizer) newGroup.isOrganizer = true;
  });
  return newGroup;
};

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
