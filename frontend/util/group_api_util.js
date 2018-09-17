export const getGroups = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/groups',
  });
};

export const getGroup = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/groups/${id}`,
  });
};
