import { Helmet } from 'react-helmet';
import React, {  } from "react";
import axios from "axios";
import clsx from 'clsx';
import config from "../../utils/config";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import {
  Box, Container, Card, CardContent,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import CustomerListToolbar from '../../components/customer/CustomerListToolbar';
import { addCourse, courses, refreshAssign, reset,checkAuthenticated } from "../../actions/action.auth";
import { connect } from "react-redux";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
var selected = [];
const courses2 = JSON.parse('{"courses":[]}');
const columns = [
  { field: 'id', headerName: 'id', width: 200,hide: true },
  { field: 'courseCode', headerName: 'Course Code', width: 200 },
  { field: 'courseName', headerName: 'Course Name', width: 200 },
  { field: 'studentID', headerName: 'Student ID', width: 200 },
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
function StudCourses({ addCourse, refreshAssign, checkAuthenticated,reset, isAuthenticated,assignLoaded,assignData }) {
  refreshAssign();
  var csdet;
  var flag = false;
  const facultyid = localStorage.getItem("idno");
  const navigate = useNavigate();
  var flag2=false;

  const [rows, setRows] = React.useState([]);
  const [srows, setsRows] = React.useState(false);
  const onSearch = (e) => {
      
    var stext=e.target.value.toString().toLowerCase();
    
    var a=rows.filter((value) => {
      console.log(value.courseName)
      return ((value.courseName.toString().toLowerCase().search(stext) !== -1) || (value.courseCode.toString().toLowerCase().search(stext) !== -1) || (value.studentID.toString().toLowerCase().search(stext) !== -1))
    });

    console.log(a)
    setsRows(a);
    flag2=true
  
  
}
  const classes = useStyles();
  const theme = useTheme();
  // const [diaopen, diasetOpen] = React.useState(false);
  const [delt, setDelt] = React.useState(true);

  const rejectCourse = () => {
    if (selected.length > 0) {
      console.log(facultyid);
      axios
        .post(`${config.backend}/api/auth/reject-assign/${selected}`)
        .then(a => {
          refreshAssign();
        })
        .catch(err => alert(err));
      window.location.reload(false);
    }
  };
  const approveCourse = () => {
    if (selected.length > 0) {
      console.log(facultyid);
      axios
        .post(`${config.backend}/api/auth/approve-assign/${selected}`)
        .then(a => {
          refreshAssign();
        })
        .catch(err => alert(err));
      window.location.reload(false);
    }
  };

  if (!facultyid) {
    console.log("a" + facultyid);
    navigate('/login', { replace: false });

  }
  if (!assignLoaded) {


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

  if (assignLoaded ) {
    refreshAssign();
    if (assignData) {
      csdet = assignData.courses;
      if (!flag && rows.length == 0) {
        setRows(csdet);
        console.log("set")
        flag = true;
      }
    }

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
                          id="searchBox"
                          name="searchBox"
                          label="Search"
                          autoFocus
                          onChange={(e) => onSearch(e)}
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
                      <DataGrid rows={(srows)? srows:rows} columns={columns} pageSize={10} className={classes.root} checkboxSelection onSelectionModelChange={(param) => {console.log(param)
                      selected=param.selectionModel;
                    // console.log(selected)
                    if (selected.length == 0) {
                          setDelt(true);
                        }
                        else {
                          setDelt(false);
                        }}} 
                      />
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
    assignLoaded: state.auth.assignLoaded,
    assignData: state.auth.assignData,


  };
};
export default connect(mapStateToProps, { addCourse, refreshAssign,reset, checkAuthenticated })(StudCourses);