import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Spinner } from 'react-bootstrap';

import { courses } from "../actions/action.auth";
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
const Home = ({ isAuthenticated }) => {
  console.log(courses);
  const logedinNow = (
    <>
      <h3>You are logged in currently</h3>
    </>
  );

  const notLogedin = (
    <>
      <h3>You are currently not logged in</h3>
    </>
  );
    if (isAuthenticated){
      sleep(1000);
      return <Redirect to="/users" />;
    }
  return (
    <div>
      <Spinner animation="border" role="status">
        </Spinner>
      <div>
        <span>Account Status:</span>
        <>{isAuthenticated ? logedinNow : notLogedin}</>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Home);
