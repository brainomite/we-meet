import * as groupAPIUtil from "./../util/group_api_util";

export const RECEIVE_GROUP = "RECEIVE_GROUP";
export const RECEIVE_GROUPS = "RECEIVE_GROUPS";
export const RECEIVE_GROUP_ERRORS = "RECEIVE_GROUP_ERRORS";

const receiveGroup = payload => {
  return {
    type: RECEIVE_GROUP,
    payload
  };
};

const receiveGroups = groups => {
  return {
    type: RECEIVE_GROUPS,
    groups
  };
};

const receiveGroupErrors = errors => {
  return {
    type: RECEIVE_GROUP_ERRORS,
    errors: errors.responseJSON
  };
};

export const fetchGroups = () => {
  return dispatch => {
    const success = result => {
      return dispatch(receiveGroups(result));
    };

    const failure = errorResults => {
      return dispatch(receiveGroupErrors(errorResults));
    };

    groupAPIUtil.getGroups().then(success, failure);
  };
};

export const fetchGroup = id => {
  return dispatch => {
    const success = result => {
      return dispatch(receiveGroup(result));
    };

    const failure = errorResults => {
      return dispatch(receiveGroupErrors(errorResults));
    };

    groupAPIUtil.getGroup(id).then(success, failure);
  };
};

export const createGroup = data => {
  return dispatch => {
    const success = result => {
      return dispatch(receiveGroup(result));
    };

    const failure = errorResults => {
      return dispatch(receiveGroupErrors(errorResults));
    };

    groupAPIUtil.createGroup(data).then(success, failure);
  };
};
