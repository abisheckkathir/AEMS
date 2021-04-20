import React, { Fragment } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/action.auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


const Navbar = ({ isAuthenticated, logout }) => {
const navigate=useNavigate();

  logout();
  navigate('/login', { replace: true });

  return (
    <div>
     <Link to="/" onClick={logout}>
          Logout
        </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
