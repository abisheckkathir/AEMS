import { Helmet } from 'react-helmet';
import React, { } from "react";
import Grid from "@material-ui/core/Grid";
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import configk from "../../utils/configk";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import { useNavigate } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import {
  Box, Container, Card} from '@material-ui/core';
import CustomerListToolbar from '../../components/customer/CustomerListToolbar';
import { addCourse, refreshRows, checkAuthenticated } from "../../actions/action.auth";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
var selected = [];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const columns = [
  { field: 'id', headerName: 'id', width: 200, hide: true },
  { field: 'courseCode', headerName: 'Course Code', width: 200 },
  { field: 'courseName', headerName: 'Course Name', width: 200 },
  {
    field: 'isApproved', headerName: 'Approval Status', width: 200, cellClassName: (params) =>
      clsx("super-app", {
        negative: params.value == "Yes",
        positive: params.value == "No",
        neutral: params.value == "Pending"
      })
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function CoursesS({ addCourse, refreshRows, checkAuthenticated, isAuthenticated, courseLoaded, coursesData }) {
  refreshRows();
  const studentid = localStorage.getItem("idno");
  var csdet;
  const [copen, setCopen] = React.useState(false);
  if (localStorage.open) {
    console.log(copen)

    if (JSON.parse(localStorage.open) != copen) {
      setCopen(JSON.parse(localStorage.open));
      console.log(copen)
    }

  } else {
    localStorage.setItem("open", false)
  }
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  var flag = false;
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const onChange = (e) =>
    SetAddData({ ...addData, [e.target.name]: e.target.value });
  const classes = useStyles();
  const theme = useTheme();
  const [diaopen, diasetOpen] = React.useState(false);
  const [delt, setDelt] = React.useState(true);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };
  const handleClose = () => {
    navigate('/app/dashboard', { replace: true });
  };
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const submitCourse = () => {
    if (right.length > 0) {
      console.log(studentid);
      axios
        .post(`${configk.backend}/api/auth/assign-course/${right}/${studentid}`)
        .then(a => {
          refreshRows();
        })
        .catch(err => alert(err));
      window.location.reload(false);
    }
  };
  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
  if (!studentid) {
    navigate('/login', { replace: true });

  }
  if (courseLoaded) {
    if (coursesData) {
      csdet = coursesData.courses;
      if (!flag && left.length == 0 && right.length==0 && csdet.length!=0) {
        setLeft(csdet);
        flag = true;
      }
    }

    // console.log(cours);
    return (
      <>
        <Helmet>
          <title>Courses | AEMS</title>
        </Helmet>
        <Dialog
          open={!copen}
          disableEscapeKeyDown={true}
          disableBackdropClick={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Course Registration not open!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Course Registration may not be opened by the chairperson or it is past deadline.
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              OK
          </Button>
          </DialogActions>
        </Dialog>

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
                    style={{ marginRight: 10 }}
                    onClick={submitCourse}
                    disabled={right.length === 0}
                    startIcon={<AddCircleRoundedIcon />}
                  >
                    Submit Preference
      </Button>
                  {/* <Button
        variant="contained"
        color="secondary"
        disabled={delt}
        // onClick={deleteCourse}
        startIcon={<DeleteIcon />}
      >
        Delete Course
      </Button> */}
                </Box>
                {/* <Box sx={{ mt: 3 }}>
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
    </Box> */}
              </Box>

              <Box height={300} sx={{ pt: 3 }}>
                <Card >
                  <Box m={2}>
                    <Grid container spacing={2} justify="space-evenly" alignItems="center" className={classes.root}>
                      <Grid item xs>{customList('Choices', left)}</Grid>
                      <Grid item xs>
                        <Grid container direction="column" alignItems="center">
                          <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                          >
                            &gt;
          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                          >
                            &lt;
          </Button>
                        </Grid>
                      </Grid>
                      <Grid item xs>{customList('Chosen', right)}</Grid>
                    </Grid>
                  </Box>
                </Card>
              </Box>

            </Container>
          </Box>
        </div>
      </>
    );
  } else {

    refreshRows();

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
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    courseLoaded: state.auth.courseLoaded,
    coursesData: state.auth.coursesData,


  };
};
export default connect(mapStateToProps, { addCourse, refreshRows, checkAuthenticated })(CoursesS);