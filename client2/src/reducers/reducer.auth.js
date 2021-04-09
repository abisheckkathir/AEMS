/* eslint-disable */

import {
  LOGIN_SUCESS,
  LOGIN_FAILED,
  AUTHENTICATION_SUCESS,
  AUTHENTICATION_FAILED,
  SIGNUP_SUCESS,
  SIGNUP_FAILED,
  LOGOUT_USER,
  COURSE_LIST,
} from "../actions/action.types";

const initialState = {
  access: localStorage.getItem("access"),
  isAuthenticated: null,
  courseLoaded:false,
  loading: true,
  coursesData: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATION_SUCESS:
      return {
        ...state,
        isAuthenticated: true,

        loading: false,
        user: payload,
      };
    case SIGNUP_SUCESS:
    case LOGIN_SUCESS:
      localStorage.setItem("access", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.token,
        loading: false,
      };
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
    case LOGOUT_USER:
    case AUTHENTICATION_FAILED:
      localStorage.removeItem("access");
      return {
        ...state,
        access: null,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case COURSE_LIST:
      return {
        ...state,
        courseLoaded:true,
        coursesData: payload,
      };

    default:
      return state;
  }
}
