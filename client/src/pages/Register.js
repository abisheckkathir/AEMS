/* eslint-disable */
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { connect } from "react-redux";
import * as Yup from 'yup';
import { Formik } from 'formik';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {
  Box,
  Button,
  MenuItem,
  IconButton,
  FilledInput,
  InputAdornment,
  Container,
  InputLabel,
  Select,
  FormHelperText,
  FormControl,
  Link,
  TextField,
  Typography
} from '@material-ui/core';

import { signup } from "../actions/action.auth";
const Register = ({ signup, isAuthenticated }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleWindowResize = () => {
     setWindowHeight(window.innerHeight);

    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, []);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  if (isAuthenticated) {
    navigate('/app/dashboard', { replace: true });
  }

  if (accountCreated) {
    navigate('/login', { replace: true });
  }
  const handleClickShowPassword = (e) => {
    setShowPass(!showPass);
    console.log(showPass);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Helmet>
        <title>Register | AEMS</title>
      </Helmet>
      <div style={{
        backgroundImage: `url("https://images.edexlive.com/uploads/user/imagelibrary/2020/11/27/original/01DEC2013NIE03_04-02-2014_19_0_1.jpg")`,
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>

        <Box
          sx={{
            // backgroundColor: 'background.default',

            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center'
          }}
        >
          <Container maxWidth="sm"  >
            <Formik
              initialValues={{
                idno: '',
                name: '',
                password: '',
                type: '',
                dept: '',
              }}
              validationSchema={
                Yup.object().shape({
                  idno: Yup.string().max(10).required('ID is required'),
                  name: Yup.string().max(255).required('Name is required'),
                  password: Yup.string().max(255).required('password is required'),
                  dept: Yup.string().required('Department is required'),
                  type: Yup.string().required('User Type is required')
                })
              }
              onSubmit={(values) => {
                signup(values.idno, values.name, values.dept, values.type, values.password);
                console.log(values);
                setAccountCreated(true);
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}  >
                  <Box bgcolor="white" borderRadius={6} p={5}>
                  <Box sx={{ mb: 3 }} >
                    <Typography
                      color="textPrimary"

                      variant="h2"
                    >
                      Create new account
                  </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Enter your details to create new account
                  </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.idno && errors.idno)}
                    fullWidth
                    helperText={touched.idno && errors.idno}
                    label="ID"
                    margin="normal"
                    name="idno"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.idno}
                    variant="filled"
                  />
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    margin="normal"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}

                    value={values.name}
                    variant="filled"
                  />
                  <FormControl required error={Boolean(touched.dept && errors.dept)} fullWidth margin="dense" variant="filled"
                  >
                    <InputLabel id="demo-simple-select-required-label">Department</InputLabel>
                    <Select
                      labelWidth={120}
                      labelId="dept"
                      id="dept"
                      name="dept"
                      onOpen={handleBlur}
                      value={values.dept}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Select one</em>
                      </MenuItem>
                      <MenuItem value={"cse"}>Computer Science</MenuItem>
                      <MenuItem value={"ece"}>Electronics and Communication</MenuItem>
                      <MenuItem value={"mee"}>Mechanical</MenuItem>
                      <MenuItem value={"eee"}>Electrical and Electronic</MenuItem>
                    </Select>
                    <FormHelperText>{touched.dept && errors.dept}</FormHelperText>
                  </FormControl>
                  <FormControl required error={Boolean(touched.type && errors.type)} fullWidth margin="dense" variant="filled"
                  >
                    <InputLabel id="typelabel">User Type</InputLabel>
                    <Select
                      labelWidth={120}
                      labelId="type"
                      id="type"
                      name="type"
                      onOpen={handleBlur}
                      value={values.type}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Select one</em>
                      </MenuItem>
                      <MenuItem value={"faculty"}>Faculty</MenuItem>
                      <MenuItem value={"student"}>Student</MenuItem>
                      <MenuItem value={"chair"}>Chairperson</MenuItem>
                    </Select>
                    <FormHelperText>{touched.type && errors.type}</FormHelperText>
                  </FormControl>
                  {/* <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="filled"
                  /> */}
                  <FormControl fullWidth margin="dense" variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="filled-adornment-password"
                      type={showPass ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange('password')}
                      onBlur={handleBlur}
                      variant="filled"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPass ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign up now
                  </Button>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Have an account?
                  {' '}
                    <Link
                      component={RouterLink}
                      to="/login"
                      variant="h6"
                    >
                      Sign in
                  </Link>
                  </Typography>
                  </Box>
                </form>
                
              )}
            </Formik>
          </Container>
        </Box>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Register);
