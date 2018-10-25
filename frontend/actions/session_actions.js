import * as SessionAPIUtil from "./../util/session_api_util";
import { openModal } from "./modal_actions";

export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const CLEAR_USER_ERRORS = "CLEAR_USER_ERRORS";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

const receiveSessionErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors.responseJSON,
  };
};

const receiveUserErrors = errors => {
  return {
    type: RECEIVE_USER_ERRORS,
    errors: errors.responseJSON,
  };
};

export const clearSessionErrors = () => {
  return dispatch => {
    return dispatch({ type: CLEAR_SESSION_ERRORS });
  };
};

export const clearUserErrors = () => {
  return dispatch => {
    return dispatch({ type: CLEAR_USER_ERRORS });
  };
};

const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER,
  };
};

const receiveCurrentUser = payload => {
  return {
    type: RECEIVE_CURRENT_USER,
    payload,
  };
};

export const login = user => {
  return dispatch => {
    const success = result => {
      return dispatch(receiveCurrentUser(result));
    };

    const failure = errorResults => {
      return dispatch(receiveSessionErrors(errorResults));
    };

    SessionAPIUtil.login(user).then(success, failure);
  };
};

export const loginDemoUser = () =>
  login({
    user: {
      email: "kermit@thefrog.com",
      password: "misspiggy",
    },
  });

export const signup = user => {
  return dispatch => {
    const success = result => {
      return dispatch(receiveCurrentUser(result));
    };

    const failure = errorResults => {
      return dispatch(receiveUserErrors(errorResults));
    };

    return SessionAPIUtil.signup(user).then(success, failure);
  };
};

export const logout = () => {
  return dispatch => {
    const success = () => {
      return dispatch(logoutCurrentUser());
    };

    const failure = errorResults => {
      return dispatch(receiveSessionErrors(errorResults));
    };

    return SessionAPIUtil.logout().then(success, failure);
  };
};

export const setAvatar = avatar => {
  return dispatch => {
    const success = result => {
      return dispatch(receiveCurrentUser(result));
    };

    dispatch(openModal("loading"));
    return SessionAPIUtil.setAvatar(avatar).then(success);
  };
};

export const getCurrentUser = userId => {
  return dispatch => {
    const success = result => {
      return dispatch(receiveCurrentUser(result));
    };

    return SessionAPIUtil.getUser(userId).then(success);
  };
};
