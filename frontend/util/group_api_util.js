export const getGroups = () => {
  return $.ajax({
    method: "GET",
    url: "/api/groups",
  });
};

export const getGroup = id => {
  return $.ajax({
    method: "GET",
    url: `/api/groups/${id}`,
  });
};

export const createGroup = group => {
  return $.ajax({
    method: "POST",
    url: `/api/groups/`,
    data: group,
  });
};

export const updateGroup = (groupId, group) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/groups/${groupId}`,
    data: group,
  });
};

export const deleteGroup = groupId => {
  return $.ajax({
    method: "DELETE",
    url: `/api/groups/${groupId}`,
  });
};

export const joinGroup = id => {
  return $.ajax({
    method: "POST",
    url: `/api/groups/${id}/group_user/`,
  });
};

export const leaveGroup = id => {
  return $.ajax({
    method: "DELETE",
    url: `/api/groups/${id}/group_user/`,
  });
};
