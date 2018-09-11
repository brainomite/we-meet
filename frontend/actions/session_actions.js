import * as SessionAPIUtil from './../util/session_api_util';

export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors.responseJSON
  };
};

const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER,
  };
};

const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    user: currentUser
  };
};

export const login = (user) => {
  return (dispatch) => {
    const success = (result) => {
      return dispatch(receiveCurrentUser(result));
    };

    const failure = (errorResults) => {
      return dispatch(receiveErrors(errorResults));
    };

    SessionAPIUtil.login(user).then(success, failure);
  };
};

export const signup = (user) => {
  return (dispatch) => {
    const success = (result) => {
      return dispatch(receiveCurrentUser(result));
    };

    const failure = (errorResults) => {
      return dispatch(receiveErrors(errorResults));
    };

    SessionAPIUtil.signup(user).then(success, failure);
  };
};


export const logout = () => {
  return (dispatch) => {
    const success = () => {
      return dispatch(logoutCurrentUser());
    };

    const failure = (errorResults) => {
      return dispatch(receiveErrors(errorResults));
    };

    SessionAPIUtil.logout().then(success, failure);
  };
};
