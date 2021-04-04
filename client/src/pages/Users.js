import React, { Suspense,Spinner } from "react";
import clsx from "clsx";
import axios from "axios";
import { Redirect } from "react-router-dom";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { DataGrid } from '@material-ui/data-grid';
import List from "@material-ui/core/List";
import Fab from "@material-ui/core/Fab";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { addCourse,courses,refreshRows } from "../actions/action.auth";
import { connect } from "react-redux";

const columns = [
  { field: 'id', headerName: 'Course Code', width: 200 },
  { field: 'courseName', headerName: 'Course Name', width: 200 },
];
// const Courselist = React.lazy(() => {const data=axios.get('/api/auth/course-list').then(resp => {
//   rows=resp.data;
//   console.log(resp.data);

// });});
// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];
// var rows;
// async function Courselist(){
  
//   const data= await axios.get('/api/auth/course-list').then(resp => {
//     rows=resp.data;
//     // var obj = JSON.parse(resp.data);
//     console.log(rows);
  
//   });
//   return  ;


// }

const drawerWidth = 240;
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value
    })
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function Courses({ addCourse, isAuthenticated }) {
  refreshRows();
  console.log("aaaaaaaaaaaa");
  console.log(courses);
//   const [rows, setRows] = React.useState(null);
//   var dd=false;
//   const fetchData = async () => {
//     const response = await axios.get('/api/auth/course-list')
//     dd=true;
//     console.log(response.data)
//     setRows(response.data) 
// }
//   fetchData();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [diaopen, diasetOpen] = React.useState(false);
  var selected = [];
  const [addData, SetAddData] = React.useState({
    courseCode: "",
    courseName: "",
    offeringFaculty: "faculty1",
  });

  const { courseCode, courseName,offeringFaculty } = addData;

  const onChange = (e) =>
    SetAddData({ ...addData, [e.target.name]: e.target.value });

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const deleteCourse=()=>{
    if (selected.length>0){
    axios
      .delete(`api/auth/delete-course/${selected}`)
      .then(data => {
        refreshRows();
      })
      .catch(err => alert(err));
      window.location.reload(false);
    }
  };
  
  const [dense] = React.useState(false);
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    diasetOpen(true);
  };
  const fab = {
    color: "primary",
    className: classes.fab,
    icon: <AddIcon />,
    label: "Add"
  };

  const handleClose = () => {
    diasetOpen(false);
  };
  const handleDone = () => {
    diasetOpen(false);
    addCourse(courseCode,courseName,offeringFaculty);
    window.location.reload(false);


  };
  if (courses==null){
    return <Redirect to="/" />;
  }
  return (<div className={classes.root}>
    <CssBaseline />

    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Course List
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"

      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <IconButton /> : <GridSearchIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Drawer>
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

    <div className={classes.toolbar} />
    {/* <Fab
      aria-label={fab.label}
      className={fab.className}
      color={fab.color}
      onClick={handleClickOpen}
    >
      {fab.icon}
    </Fab> */}
    <Grid item xs={12} md={6}>
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      <div className={classes.demo}>
      <Button
        variant="contained"
        color="primary"
        style={{marginRight: 10}}
        className={classes.button}
        onClick={handleClickOpen}
        startIcon={<AddCircleRoundedIcon />}
      >
        Add Course
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={deleteCourse}
        startIcon={<DeleteIcon />}
      >
        Delete Course
      </Button>
      <div style={{ height: 20, width: '100%' }}></div>
      <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={courses} columns={columns} pageSize={10} checkboxSelection onRowSelected	={(param) => {
                    console.log("aabbcc");
                    if (param.isSelected){
                      selected.push(param.data.id);
                    }
                    else{
                      for (let i = 0; i < selected.length; i++) {
                        if(selected[i]==param.data.id){
                          selected.splice(i, 1);
                        }
                      }
                    }
                    console.log(selected);
                }} />
    </div>      </div>
    </Grid>
  </div>);
  
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps,{addCourse} )(Courses);