import { setCookie } from "../../../utils/cookieUtils";

// actionTypes.js
export const LOGIN_REQUEST = "loginRequest";
export const LOGIN_SUCCESS = "loginSuccess";
export const LOGIN_FAILURE = "loginFailure";
export const REGISTER_REQUEST = "registerRequest";
export const REGISTER_SUCCESS = "registerSuccess";
export const REGISTER_FAILURE = "registerFailure";
export const LOGOUT = "LOGOUT";

// Action creator for login request
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

// Action creator for login success
export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

// Action creator for login failure
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

// Action creator for login success
export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

// Action creator for login failure
export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});
