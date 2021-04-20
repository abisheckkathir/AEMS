import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/action.auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


const Navbar = ({ isAuthenticated, logout }) => {
  const authorizedLinks = (
    <>
    <Button marginright="20px" variant="light"  >
    <li>
        <Link to="/users">Courses</Link>
      </li>
      </Button>
      <Button marginright="20px" variant="light"  >
      <li>
        <Link to="/" onClick={logout}>
          Logout
        </Link>
      </li>
      </Button>
    </>
  );

  const guestLinks = (
    <Fragment>
      <Button marginright="20px" variant="light"  >
      <li>
        <Link to="/login">Log In</Link>
      </li>
      </Button>
      <Button marginright="20px" variant="light"  >
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
      </Button>
    </Fragment>
  );

  return (
    <div>
      <nav>
        <ul><Button marginright="20px" variant="light"  >
          <li >
            <Link to="/">Home </Link>
          </li></Button>
          {
            <Fragment>
              {isAuthenticated ? authorizedLinks : guestLinks}
            </Fragment>
          }
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
