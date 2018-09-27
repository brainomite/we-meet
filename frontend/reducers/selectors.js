export const getCurrentUser = ({ entities, session }) => {
  return entities.users[session.id];
};

export const getIsLoggedIn = state => {
  return Boolean(getCurrentUser(state));
};
