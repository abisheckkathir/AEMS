import axios from 'axios';
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
} from './action.types';
/* eslint-disable */
import setAuthToken from '../utils/setAuthToken';

// export const abc=123;
export var courses;
export const refreshRows = () => async (dispatch) => {
  var fid=localStorage.getItem("idno");
  if (localStorage.getItem("type")!="faculty"){
    fid="";
  }
  console.log("action")
  try {
  const res = axios.get('http://localhost:8080/api/auth/course-list',{ params: { offeringFaculty:fid } })
    .then(res => {
      console.log(fid);
      // console.log(res);
      let jsonObj = JSON.stringify(res.data);
      
      if (jsonObj.length > 2) {
        jsonObj = '{"courses":' + jsonObj + '}'
        // console.log(jsonObj)
        var js = JSON.parse(jsonObj);
        for (let i in js.courses) {
          // if (js.courses[i].offeringFaculty!=fid){
          //   js.courses.splice
          //   continue;
          // }
          delete js.courses[i]._id;
          delete js.courses[i].__v;
          // delete js.courses[i].offeringFaculty;
          js.courses[i].id = js.courses[i].courseCode
          delete js.courses[i].courseCode;


        }
        var jso = JSON.stringify(js);
        // jso=jso.replace('course','');
        jso = jso.slice(11, -1)
        // console.log(jso)
        // delete jsonObj['_id'];
        // console.log(jsonObj.courseName);
        // // delete jsonObj.oferringFaculty;
        // // delete jsonObj.__v;
        courses = JSON.parse(jso);
        // console.log(persons)
      }
    });
    dispatch({
      type: COURSE_LIST,
      payload: res,
    });}catch (e) {
      console.log(e);
    }

};

//Action checks for authentication 

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.access) {
    setAuthToken(localStorage.access);
  }

  try {
    const res = await axios.get("http://localhost:8080/api/auth/");
    
    dispatch({
      type: AUTHENTICATION_SUCESS,
      payload: res.data,
    });
    return true;
  } catch (e) {
    console.log(e);
    dispatch({
      type: AUTHENTICATION_FAILED,
    });
    return false;
  }
};

export const login = (idno,type, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ idno, password });
  console.log(body);
  try {
    const res = await axios.post("http://localhost:8080/api/auth//signin-" + type, body, config);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCESS,
      payload: res.data,
    });
    dispatch(checkAuthenticated());
    localStorage.setItem("idno",idno);
    console.log("done");
    localStorage.setItem("usertype",type);
    refreshRows();
    console.log("user logged In!");
  } catch (err) {
    console.log(err)
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

export const signup = (idno, name,dept, type,password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ idno, name,dept, password });

  try {
    console.log(body);
    console.log(config)
    const res = await axios.post("http://localhost:8080/api/auth/register-" + type, body, config);
    dispatch({
      type: SIGNUP_SUCESS,
      payload: res.data,
    });
    dispatch(checkAuthenticated());
    localStorage.setItem("idno",idno);
    localStorage.setItem("usertype",type);
    console.log("user created!");
  } catch (err) {
    console.log(err)
    dispatch({
      type: SIGNUP_FAILED,
    });
  }
};
export const addCourse = (courseCode, courseName, offeringFaculty,isApproved) => async (dispatch) => {
  console.log("enteredaddco");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ courseCode, courseName, offeringFaculty,isApproved });

  try {
    console.log(body);
    console.log(config)

    const res = await axios.post("http://localhost:8080/api/auth/add-course", body, config);
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
