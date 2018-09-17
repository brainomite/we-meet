import * as groupAPIUtil from "./../util/group_api_util";

export const RECEIVE_GROUP = "RECEIVE_GROUP";
export const RECEIVE_GROUPS = "RECEIVE_GROUPS";

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

export const fetchGroups = () => {
  return dispatch => {
    const success = result => {
      return dispatch(receiveGroups(result));
    };

    const failure = errorResults => {
      console.log(errorResults);
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
      console.log(errorResults);
    };

    groupAPIUtil.getGroup(id).then(success, failure);
  };
};
