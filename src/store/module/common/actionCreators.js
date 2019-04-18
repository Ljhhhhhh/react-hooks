import * as actionTypes from "./actionTypes";

const setTitle = title => ({
  type: actionTypes.PAGETITLE,
  title
});

const setUser = userinfo => ({
  type: actionTypes.USERINFO,
  userinfo
})

export const setPageTitle = title => {
  return dispatch => {
    dispatch(setTitle(title));
  };
};

export const setUserinfo = userinfo => {
  return dispatch => {
    dispatch(setUser(userinfo));
  };
};
