import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { green } from '@material-ui/core/colors';
import { connect } from "react-redux";

const Budget = (props) => {
  if(props.coursesData){
    return(
      <Card
      >
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between'}}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                APPROVED COURSES
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {props.coursesData.appr}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: green[600],
                  height: 56,
                  width: 56
                }}
              >
                <ThumbUpOutlinedIcon />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )

  }else{
    console.log(props)
    return(
      <Card
      >
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: 'space-between'}}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                APPROVED COURSES
              </Typography>
              <CircularProgress color="inherit" />
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: green[600],
                  height: 56,
                  width: 56
                }}
              >
                <ThumbUpOutlinedIcon />
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
export default connect(mapStateToProps)(Budget);
