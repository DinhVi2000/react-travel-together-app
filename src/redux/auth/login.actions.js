import * as types from "./login.constants";

export const loginRequested = () => ({
  type: types.LOGIN_PROCESSING,
});

export const loginSuccess = (payload) => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

export const loginFailed = (payload) => ({
  type: types.LOGIN_FAILED,
  payload,
});

export const setUserData = (payload) => ({
  type: types.SET_USER_DATA,
  payload,
});
