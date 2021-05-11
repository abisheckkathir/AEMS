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
  COURSE_FAIL,
  ASSIGN_LIST,
  COURSEADD_FAILED,
} from './action.types';
/* eslint-disable */
import setAuthToken from '../utils/setAuthToken';
import configk from "../utils/configk";
export var courses;
export var coursesS;
export var appr=0;
export var rej=0;
export var pend=0;
var dict;
var dictS;
var csdet=[];
export const refreshRows = () => async (dispatch) => {
  var user=localStorage.getItem("idno");
  var fid=user
  if(!fid){
    window.location.reload(false);
  }
  if (localStorage.getItem("type")!="faculty"){
    fid="";
  }
  console.log(fid)
  try {
  const res = axios.get(`${configk.backend}/api/auth/course-list`,{ params: { offeringFaculty:fid } })
    .then(res => {
      console.log(fid);
      let jsonObj = JSON.stringify(res.data);
      
      appr=0;
      rej=0;
      pend=0;
      csdet=[]
      courses=[];
      if (jsonObj.length > 2) {
        jsonObj = '{"courses":' + jsonObj + '}'
        var js = JSON.parse(jsonObj);
        for (let i in js.courses) {
          if (js.courses[i].isApproved=="Yes"){
            csdet.push(js.courses[i].courseCode+" "+js.courses[i].courseName);
            appr+=1;
          }else if (js.courses[i].isApproved=="No") {
            rej+=1;
          }else{
            pend+=1;
          }
          delete js.courses[i].__v;
          js.courses[i].id = js.courses[i]._id
          delete js.courses[i]._id;


        }
        var jso = JSON.stringify(js);
        jso = jso.slice(11, -1)
        courses = JSON.parse(jso);

        console.log(courses)
 
      }
      if(localStorage.getItem("type")=="student"){
        dict = {"courses":csdet,"appr":appr,"rej":rej,"pend":pend};
      }else{
        dict = {"courses":courses,"appr":appr,"rej":rej,"pend":pend};
      }
      
    });
    dispatch({
      type: COURSE_LIST,
      payload: dict,
    });}catch (e) {
      console.log(e);
    }

};
export const refreshAssign = () => async (dispatch) => {
  var user=localStorage.getItem("idno");
  var fid=user
  if(!fid){
    window.location.reload(false);
  }
  if (localStorage.getItem("type")!="faculty"){
    fid="";
  }
  console.log(fid)
  try {
  const res = axios.get(`${configk.backend}/api/auth/assign-list`,{ params: { studentID:fid } })
    .then(res => {
      console.log(fid);
      let jsonObj = JSON.stringify(res.data);
      coursesS=[];
      if (jsonObj.length > 2) {
        jsonObj = '{"courses":' + jsonObj + '}'
        var js = JSON.parse(jsonObj);
        for (let i in js.courses) {
          js.courses[i].courseName = js.courses[i].courseCode.split(" ").slice(1).join(" ");
          js.courses[i].courseCode = js.courses[i].courseCode.split(" ")[0]
          delete js.courses[i].__v;
          js.courses[i].id = js.courses[i]._id
          delete js.courses[i]._id;


        }
        var jso = JSON.stringify(js);
        jso = jso.slice(11, -1)
        coursesS = JSON.parse(jso);
        dictS = {"courses":coursesS};
        console.log(coursesS)
 
      }
      
    });
    dispatch({
      type: ASSIGN_LIST,
      payload: dictS,
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
    const res = await axios.get(`${configk.backend}/api/auth/`);
    
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
    const res = await axios.post(`${configk.backend}/api/auth/signin-` + type, body, config);
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
    const res = await axios.post(`${configk.backend}/api/auth/register-` + type, body, config);
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

    const res = await axios.post(`${configk.backend}/api/auth/add-course`, body, config);
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

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};
export const reset = () => (dispatch) => {
  dispatch({
    type: COURSE_FAIL,
  });
};
