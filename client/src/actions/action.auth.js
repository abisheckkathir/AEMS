import axios from "axios";
import {
  LOGIN_SUCESS,
  LOGIN_FAILED,
  AUTHENTICATION_SUCESS,
  AUTHENTICATION_FAILED,
  SIGNUP_FAILED,
  SIGNUP_SUCESS,
  LOGOUT_USER,
  COURSE_ADDED,
  COURSE_LIST,
  COURSEADD_FAILED,
} from "./action.types";

import setAuthToken from "../utils/setAuthToken";
export const abc=123;
export var courses;
export async function refreshRows(){
  const res=axios.get('api/auth/course-list')
.then(res => {
  // console.log(JSON.stringify(res.data));
  let jsonObj = JSON.stringify(res.data);
  jsonObj='{"courses":'+jsonObj+'}'
  console.log(jsonObj)
  var js=JSON.parse(jsonObj);
  var x;
  for (let i in js.courses) {
    delete js.courses[i]._id;
    delete js.courses[i].__v;
    delete js.courses[i].offeringFaculty;
    js.courses[i].id=js.courses[i].courseCode
    delete js.courses[i].courseCode;


  }
  var jso=JSON.stringify(js);
  // jso=jso.replace('course','');
  jso=jso.slice(11,-1)
  // console.log(jso)
  // delete jsonObj['_id'];
  // console.log(jsonObj.courseName);
  // // delete jsonObj.oferringFaculty;
  // // delete jsonObj.__v;
   courses = JSON.parse(jso);
  // console.log(persons)
  
});
}
//Action checks for authentication
export const check_authenticated = () => async (dispatch) => {
  if (localStorage.access) {
    setAuthToken(localStorage.access);
  }

  try {
    const res = await axios.get("api/auth/");
    refreshRows();
    dispatch({
      type: AUTHENTICATION_SUCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: AUTHENTICATION_FAILED,
    });
  }
};

export const login = (idno, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ idno, password });
  console.log(body);
  try {
    const res = await axios.post("api/auth//signin-faculty", body, config);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCESS,
      payload: res.data,
    });
    dispatch(check_authenticated());
    refreshRows();
    console.log("user logged In!");
  } catch (err) {
    console.log(err)
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

export const signup = (idno, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ idno, password });

  try {
    console.log(body);
    console.log(config)
    const res = await axios.post("api/auth/register-user", body, config);
    dispatch({
      type: SIGNUP_SUCESS,
      payload: res.data,
    });
    dispatch(check_authenticated());
    console.log("user created!");
  } catch (err) {
    dispatch({
      type: SIGNUP_FAILED,
    });
  }
};
export const addCourse = (courseCode,courseName,offeringFaculty) => async (dispatch) => {
  console.log("enteredaddco");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ courseCode,courseName,offeringFaculty });

  try {
    console.log(body);
    console.log(config)

    const res = await axios.post("api/auth/add-course", body, config);
    refreshRows();
    dispatch({
      type: COURSE_ADDED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: COURSEADD_FAILED,
    });
  }
};
// export const courseList = () => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   try {

//     const res = await axios.get("api/auth/course-list");
//     dispatch({
//       type: COURSE_LIST,
//       payload: res.data,
//     });
//   } catch (err) {
//     console.log(err)
//     dispatch({
//       type: COURSEADD_FAILED,
//     });
//   }
// };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};
