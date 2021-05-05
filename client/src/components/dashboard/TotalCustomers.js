import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { rej } from "../../actions/action.auth";
import CircularProgress from '@material-ui/core/CircularProgress';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import { connect } from "react-redux";

const TotalCustomers = (props) => {
  if (props.coursesData) {
    return (
      <Card >
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
                REJECTED COURSES
          </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {props.coursesData.rej}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: red[900],
                  height: 56,
                  width: 56
                }}
              >
                <ThumbDownOutlinedIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }else{
    return (
      <Card >
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
                REJECTED COURSES
          </Typography>
          <CircularProgress color="inherit" />
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: red[900],
                  height: 56,
                  width: 56
                }}
              >
                <ThumbDownOutlinedIcon />
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
export default connect(mapStateToProps)(TotalCustomers);