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
  COURSE_FAIL,
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
    case COURSE_LIST:
      return {
        ...state,
        courseLoaded:true,
        coursesData: payload,
      };
    case COURSE_FAIL:
      return {
        ...state,
        courseLoaded:false,
        coursesData: payload,
      };
    case AUTHENTICATION_SUCESS:
      return {
        ...state,
        isAuthenticated: true,

        loading: false,
        // user: payload.user,
      };
    case SIGNUP_SUCESS:
    case LOGIN_SUCESS:
      localStorage.setItem("access", payload.token);
      localStorage.setItem("user",JSON.stringify(payload.user))
      localStorage.setItem("type",payload.userType)
      console.log(payload.user);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.token,
        user: payload.user,
        loading: false,
      };
    case LOGIN_FAILED:
      console.log("LOGIN_FAILED");
    case SIGNUP_FAILED:
      console.log("SIGNUP_FAILED");

    case LOGOUT_USER:
      console.log("LOGOUT_USER");

    case AUTHENTICATION_FAILED:
      console.log("AUTHENTICATION_FAILED");

      localStorage.removeItem("access");
      localStorage.removeItem("usertype");
      localStorage.removeItem("idno");
      return {
        ...state,
        access: null,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
   

    default:
      return state;
  }
}
