import { Helmet } from 'react-helmet';
import React, { Suspense, Spinner } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

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
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import customers from 'src/__mocks__/customers';
import { addCourse, courses, refreshRows, checkAuthenticated } from "../actions/action.auth";
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
  { field: 'id', headerName: 'Course Code', width: 200 },
  { field: 'courseName', headerName: 'Course Name', width: 200 },
];
const useStyles = makeStyles((theme) => ({
  root: {
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
function Courses({ addCourse, refreshRows, checkAuthenticated, isAuthenticated, courseLoaded }) {
  refreshRows();
  checkAuthenticated();
  const navigate = useNavigate();
  const [addData, SetAddData] = React.useState({
    courseCode: "",
    courseName: "",
    offeringFaculty: "faculty1",
  });
  const [filterValue, setFilterValue] = React.useState();
  const [rows, setRows] = React.useState([]);
//   const onFilterChange = React.useCallback((params) => {
//     setFilterValue(params.filterModel.items[0].value);
//   }, []);
  const { courseCode, courseName, offeringFaculty } = addData;
  const onChange = (e) =>
    SetAddData({ ...addData, [e.target.name]: e.target.value });
  const classes = useStyles();
  const theme = useTheme();
  const [diaopen, diasetOpen] = React.useState(false);
  const filter = () => {
    setRows(courses.filter(
      (row) => row.courseName.toLowerCase().indexOf(filterValue) > -1,
    )); };
  const deleteCourse = () => {
    if (selected.length > 0) {
      axios
        .delete(`http://localhost:8080/api/auth/delete-course/${selected}`)
        .then(data => {
          refreshRows();
        })
        .catch(err => alert(err));
      window.location.reload(false);
    }
  };
  const handleClose = () => {
    diasetOpen(false);
  };
  const handleClickOpen = () => {
    diasetOpen(true);
  };
  const filterChange = (e) => {
    setFilterValue(e.target.value);
    filter();
  };
  
  const handleDone = () => {
    diasetOpen(false);
    addCourse(courseCode, courseName, offeringFaculty);
    window.location.reload(false);


  };
  // if(!isAuthenticated){
  //   navigate('/login', { replace: false });

  // }
  if (!courseLoaded || courses == null) {

    refreshRows();

    return (
      <>
        <Helmet>
          <title>Courses | AEMS</title>
        </Helmet>

        <div style={{
          backgroundImage: `url("https://images.edexlive.com/uploads/user/imagelibrary/2020/11/27/original/01DEC2013NIE03_04-02-2014_19_0_1.jpg")`,
          // height: '100%',
          backgroundPosition: 'center',
          // backgroundRepeat: 'no-repeat',
          // backgroundSize: 'cover',
          // overflowY: 'hidden'
        }}

        >
          <Box
            sx={{
              // backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
              overflow: 'scroll'
            }}
          >
            <Container maxWidth={false} >
              <CustomerListToolbar />

              <Box sx={{ pt: 3 }}>
                {/* <DataGrid rows={courses2} columns={columns} pageSize={10} checkboxSelection onRowSelected	={(param) => {
                        console.log("aabbcc");
                        if (param.isSelected){
                          selected.push(param.data.id);
                        }
                        else{
                          for (let i = 0; i < selected.length; i++) {
                            if(selected[i]===param.data.id){
                              selected.splice(i, 1);
                            }
                          }
                        }
                        console.log(selected);
                    }} /> */}
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

  if (courseLoaded && courses != null) {
    setRows(courses);
    console.log(courses);
    return (
      <>
        <Helmet>
          <title>Courses | AEMS</title>
        </Helmet>
        <Dialog
          disableEscapeKeyDown={true}
          disableBackdropClick={true}
          open={diaopen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Course</DialogTitle>
          <DialogContent>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="courseCode"
                    variant="outlined"
                    required
                    fullWidth
                    id="courseCode"
                    label="Course Code"
                    autoFocus
                    onChange={(e) => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="courseName"
                    label="Course Name"
                    name="courseName"
                    onChange={(e) => onChange(e)}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
        </Button>
            <Button onClick={handleDone} color="primary">
              Add Course
        </Button>
          </DialogActions>
        </Dialog>
        <div style={{
          backgroundImage: `url("https://images.edexlive.com/uploads/user/imagelibrary/2020/11/27/original/01DEC2013NIE03_04-02-2014_19_0_1.jpg")`,
          height: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          // overflowY: 'hidden'
        }}

        >
          <Box
            sx={{

              // backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
              // overflow: 'scroll'
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
                    style={{ marginRight: 10 }}
                    onClick={handleClickOpen}
                    startIcon={<AddCircleRoundedIcon />}
                  >
                    Add Course
      </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={deleteCourse}
                    startIcon={<DeleteIcon />}
                  >
                    Delete Course
      </Button>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Card>
                    <CardContent>
                      <Box sx={{ maxWidth: 500 }}>
                        <TextField
                          fullWidth
                          name="search"
                          onChange={filterChange}
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
                      <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection onRowSelected={(param) => {
                        console.log("aabbcc");
                        if (param.isSelected) {
                          selected.push(param.data.id);
                        }
                        else {
                          for (let i = 0; i < selected.length; i++) {
                            if (selected[i] === param.data.id) {
                              selected.splice(i, 1);
                            }
                          }
                        }
                        console.log(selected);
                      }} filterMode="server"
                        // onFilterModelChange={onFilterChange} 
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
    courseLoaded: state.auth.courseLoaded,
    // coursesData: state.auth.coursesData,


  };
};
export default connect(mapStateToProps, { addCourse, refreshRows, checkAuthenticated })(Courses);