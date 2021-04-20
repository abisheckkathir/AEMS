import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import {rej } from "../../actions/action.auth";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';

const TotalCustomers = (props) => (
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
            REJECTED COURSES
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {rej}
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
);

export default TotalCustomers;
