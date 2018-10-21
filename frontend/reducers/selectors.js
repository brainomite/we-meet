import merge from "lodash/merge";

const DEFAULT_GROUP_USER = {
  id: null,
  user_id: null,
  group_id: null,
  member_type: null,
};

const DEFAULT_GROUP = {
  name: "",
  description: "",
  group_user_ids: [],
  hometown: "",
  id: null,
  member_ids: [],
};
const DEFAULT_USER = {
  name: "",
  hometown_id: null,
  id: null,
  avatarUrl: null,
};

export const selectGroup = (state, groupId) => {
  const originalGroup = state.entities.groups[groupId] || {};
  const newGroup = merge({}, DEFAULT_GROUP, originalGroup);
  newGroup.members = selectUsers(state, newGroup.member_ids);
  newGroup.organizerIds = [];
  newGroup.group_user_ids.forEach(groupUserId => {
    const groupUser = selectGroupUser(state, groupUserId);
    const isOrganizer = groupUser.member_type === "Organizer";
    if (newGroup.members[groupUser.user_id]) {
      newGroup.members[groupUser.user_id].memberType = groupUser.member_type;
    }
    if (isOrganizer) {
      newGroup.organizerIds.push(groupUser.user_id);
    }
    if (state.session.id === groupUser.user_id) newGroup.isMember = true;
    if (newGroup.isMember && isOrganizer) newGroup.isOrganizer = true;
  });
  return newGroup;
};

const selectUsers = (state, userIds) => {
  return userIds.reduce((accumObj, userId) => {
    accumObj[userId] = selectUser(state, userId);
    return accumObj;
  }, {});
};

const selectUser = ({ entities }, userId, defaultUser = DEFAULT_USER) =>{
  const user = entities.users[userId] || defaultUser;
  if (user) return merge({}, user);
  return user;
};

export const selectGroupUser = ({ entities }, id) => {
  return entities.groupUsers[id] || DEFAULT_GROUP_USER;
};

export const selectCurrentUser = state => {
  return selectUser(state, state.session.id, null);
};

export const selectIsLoggedIn = state => {
  return Boolean(selectCurrentUser(state));
};

export const selectUserGroups = state => {
  const groupArray = [];
  const groups = state.entities.groups;
  if (selectIsLoggedIn(state)) {
    const curUser = selectCurrentUser(state);
    if (curUser.group_ids)
      curUser.group_ids.forEach(groupId => {
        if (groups[groupId]) groupArray.push(groups[groupId]);
      });
  }
  return groupArray;
};
