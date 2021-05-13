import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';

import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
const TasksProgress = (props, { courseLoaded, coursesData }) => {
  if (props.coursesData) {
    return (
      <Card
      >
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                PENDING COURSES
          </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {props.coursesData.pend}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: orange[600],
                  height: 56,
                  width: 56
                }}
              >
                <TimerOutlinedIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }else{
    return (
      <Card
      >
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                PENDING COURSES
          </Typography>
          <CircularProgress color="inherit" />
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: orange[600],
                  height: 56,
                  width: 56
                }}
              >
                <TimerOutlinedIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    courseLoaded: state.auth.courseLoaded,
    coursesData: state.auth.coursesData,
  };
};
export default connect(mapStateToProps)(TasksProgress);
