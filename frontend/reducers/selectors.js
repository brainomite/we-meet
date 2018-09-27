export const getCurrentUser = ({ entities, session }) => {
  return entities.users[session.id];
};
