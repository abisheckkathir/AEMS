/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable*/
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { connect } from "react-redux";
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  MenuItem,
  Grid,
  FormControlLabel,
  Link,
  InputLabel,
  Select,
  FormHelperText,
  FormControl,
  TextField,
  Radio,
  RadioGroup,
  Typography
} from '@material-ui/core';
import { login } from "../actions/action.auth";

const Login = ({ login, isAuthenticated }) => {
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate('/app/dashboard', { replace: true });
  }

  return (
    <>
      <Helmet>
        <title>Login | AEMS</title>
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
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              idno: '',
              password: '',
              type: '',
            }}
            validationSchema={Yup.object().shape({
              idno: Yup.string().max(10).required('ID is required'),
              password: Yup.string().max(255).required('password is required'),
              type: Yup.string().required('User Type is required')
            })}
            onSubmit={(values) => {
              login(values.idno, values.type, values.password);
              console.log(values);
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
              <form onSubmit={handleSubmit}>
                <Box bgcolor="white" borderRadius={6} p={5}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the AEMS platform
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
                  variant="outlined"
                />
                <FormControl required error={Boolean(touched.type && errors.type)} fullWidth margin="dense" variant="outlined"
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
                <TextField
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
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
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

export default connect(mapStateToProps, { login })(Login);
