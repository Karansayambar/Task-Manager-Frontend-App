// reducer/authReducer.js

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../actions/authAction";
// const SECRET_KEY = 'b32jh78y732bjnhb87y87324b87'
const authFromSession = localStorage.getItem("isAuthenticated") === "true";
const initialState = {
  loading: false,
  error: false,
  isAuthenticated: authFromSession, // Set initial state from sessionStorage
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: false };
    case LOGIN_SUCCESS:
      localStorage.setItem("isAuthenticated", "true")
            return { ...state, loading: false, isAuthenticated: true, error: false };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: false };
    case REGISTER_SUCCESS:
      localStorage.setItem("isAuthenticated", "true")
      return { ...state, loading: false, isAuthenticated: true, error: false };
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      // Remove auth status from sessionStorage
      localStorage.removeItem("isAuthenticated");
      return { ...state, isAuthenticated: false, loading: false, error: false };
    default:
      return state;
  }
};

export default authReducer;
