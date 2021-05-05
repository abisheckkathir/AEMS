import { Helmet } from 'react-helmet';
import React, { Suspense, Spinner } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import clsx from 'clsx';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import {
  Box, Container, Card, CardContent,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
// import CustomerListResults from './components/customer/CustomerListResults';
import CustomerListToolbar from '../../components/customer/CustomerListToolbar';
// import customers from './__mocks__/customers';
import { addCourse, courses, refreshRows, reset,checkAuthenticated } from "../../actions/action.auth";
import { connect } from "react-redux";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from "@material-ui/core/DialogTitle";
var selected = [];
const courses2 = JSON.parse('{"courses":[]}');
const columns = [
  { field: 'id', headerName: 'id', width: 200,hide: true },
  { field: 'courseCode', headerName: 'Course Code', width: 200 },
  { field: 'courseName', headerName: 'Course Name', width: 200 },
  { field: 'offeringFaculty', headerName: 'Offering Faculty', width: 200 },
  {
    field: 'isApproved', headerName: 'Approval Status', width: 200, cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value=="Yes",
        positive: params.value=="No",
        neutral: params.value=="Pending"
      })
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    "& .super-app-theme--cell": {
      backgroundColor: "rgba(224, 183, 60, 0.55)",
      color: "#1a3e72",
      fontWeight: "600"
    },
    "& .super-app.negative": {
      backgroundColor: "rgba(157, 255, 118, 0.49)",
      color: "#1a3e72",
      fontWeight: "600"
    },
    "& .super-app.positive": {
      backgroundColor: "#d47483",
      color: "#1a3e72",
      fontWeight: "600"
    },
    "& .super-app.neutral": {
      backgroundColor: "rgba(224, 183, 60, 0.55)",
      color: "#1a3e72",
      fontWeight: "600"
    },
    display: "flex"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));
function CoursesC({ addCourse, refreshRows, checkAuthenticated,reset, isAuthenticated,courseLoaded,coursesData }) {
  refreshRows();
  const facultyid = localStorage.getItem("idno");
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  // const [diaopen, diasetOpen] = React.useState(false);
  const [delt, setDelt] = React.useState(true);

  const rejectCourse = () => {
    if (selected.length > 0) {
      console.log(facultyid);
      axios
        .post(`http://localhost:8080/api/auth/reject-course/${selected}`)
        .then(a => {
          refreshRows();
        })
        .catch(err => alert(err));
      window.location.reload(false);
    }
  };
  const approveCourse = () => {
    if (selected.length > 0) {
      console.log(facultyid);
      axios
        .post(`http://localhost:8080/api/auth/approve-course/${selected}`)
        .then(a => {
          refreshRows();
        })
        .catch(err => alert(err));
      window.location.reload(false);
    }
  };

  if (!facultyid) {
    console.log("a" + facultyid);
    navigate('/login', { replace: false });

  }
  if (!courseLoaded) {


    return (
      <>
        <Helmet>
          <title>Courses | AEMS</title>
        </Helmet>

        <div style={{
          backgroundImage: `url("https://images.edexlive.com/uploads/user/imagelibrary/2020/11/27/original/01DEC2013NIE03_04-02-2014_19_0_1.jpg")`,
          backgroundPosition: 'center',

        }}

        >
          <Box
            sx={{
              minHeight: '100%',
              py: 3,
              overflow: 'scroll'
            }}
          >
            <Container maxWidth={false} >
              <CustomerListToolbar />

              <Box sx={{ pt: 3 }}>
                <Backdrop className={classes.backdrop} open={true}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Box>

            </Container>
          </Box>

        </div>
      </>
    );
  };

  if (courseLoaded ) {
    refreshRows();

    console.log(courses);
    return (
      <>
        <Helmet>
          <title>Courses | AEMS</title>
        </Helmet>
        <div style={{
          backgroundImage: `url("https://images.edexlive.com/uploads/user/imagelibrary/2020/11/27/original/01DEC2013NIE03_04-02-2014_19_0_1.jpg")`,
          height: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}

        >
          <Box
            sx={{

              minHeight: '100%',
              py: 3,
            }}
          >
            <Container maxWidth={false} >
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={delt}
                    style={{ marginRight: 10 }}
                    onClick={approveCourse}
                    startIcon={<AddCircleRoundedIcon />}
                  >
                    Approve Course
      </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={delt}
                    onClick={rejectCourse}
                    startIcon={<DeleteIcon />}
                  >
                    Reject Course
      </Button>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Card>
                    <CardContent>
                      <Box sx={{ maxWidth: 500 }}>
                        <TextField
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SvgIcon
                                  fontSize="small"
                                  color="action"
                                >
                                  <SearchIcon />
                                </SvgIcon>
                              </InputAdornment>
                            )
                          }}
                          placeholder="Search course"
                          variant="outlined"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              <Box height={300} sx={{ pt: 3 }}>
                <Card >
                  <PerfectScrollbar>
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid rows={(coursesData) ? coursesData.courses:[]} columns={columns} pageSize={10} className={classes.root} checkboxSelection onRowSelected={(param) => {
                        console.log("aabbcc");
                        if (param.isSelected) {
                          selected.push(param.data.id);
                        }
                        else {
                          for (let i = 0; i < selected.length; i++) {
                            if (selected[i] === (param.data.id)) {
                              selected.splice(i, 1);
                            }
                          }
                        }
                        if (selected.length == 0) {
                          setDelt(true);
                        }
                        else {
                          setDelt(false);
                        }
                        console.log(selected);
                      }} />
                    </div>
                  </PerfectScrollbar>
                </Card>
              </Box>

            </Container>
          </Box>
        </div>
      </>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    courseLoaded: state.auth.courseLoaded,
    coursesData: state.auth.coursesData,


  };
};
export default connect(mapStateToProps, { addCourse, refreshRows,reset, checkAuthenticated })(CoursesC);