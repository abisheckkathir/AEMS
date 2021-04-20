import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import {appr} from "../../actions/action.auth";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { green } from '@material-ui/core/colors';

const Budget = (props) => (
  <Card
    {...props}
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
            {appr}
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
);

export default Budget;
