import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { pend, appr, rej } from "../../actions/action.auth";
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from "react-redux";

const TotalProfit = (props, { courseLoaded, coursesData }) => {
  if (props.coursesData) {
    return (
      <Card {...props}>
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
                TOTAL COURSES
          </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {props.coursesData.appr + props.coursesData.rej + props.coursesData.pend}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: indigo[600],
                  height: 56,
                  width: 56
                }}
              >
                <BookOutlinedIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }else{
    return (
      <Card {...props}>
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
                TOTAL COURSES
          </Typography>
          <CircularProgress color="inherit" />
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: indigo[600],
                  height: 56,
                  width: 56
                }}
              >
                <BookOutlinedIcon />
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
export default connect(mapStateToProps)(TotalProfit);
