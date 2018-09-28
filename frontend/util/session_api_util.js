export const signup = user => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: user,
  });
};

export const login = user => {
  return $.ajax({
    method: "POST",
    url: "/api/session",
    data: user,
  });
};

export const logout = () => {
  return $.ajax({
    method: "DELETE",
    url: "/api/session",
  });
};

export const setAvatar = avatar => {
  return $.ajax({
    method: "POST",
    url: "/api/avatar",
    data: avatar,
    contentType: false,
    processData: false,
  });
};

export const getUser = userId => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}`,
  });
};
