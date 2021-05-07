import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import {pend,appr,rej} from "../../actions/action.auth";
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from "react-redux";


const TrafficByDevice = (props) => {
  const theme = useTheme();
  if (props.coursesData){
    const appr=props.coursesData.appr;
    const rej=props.coursesData.rej;
    const pend=props.coursesData.pend;
    const tot=(appr+pend+rej)?(appr+pend+rej):1;
    const data = {
      datasets: [
        {
          data: [appr, rej, pend],
          backgroundColor: [
            colors.green[600],
            colors.red[900],
            colors.orange[600]
          ],
          borderWidth: 8,
          borderColor: colors.common.white,
          hoverBorderColor: colors.common.white
        }
      ],
      labels: ['Approved', 'Rejected', 'Pending']
    };
    const options = {
      animation: false,
      cutoutPercentage: 80,
      layout: { padding: 0 },
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      responsive: true,
      tooltips: {
        backgroundColor: theme.palette.background.paper,
        bodyFontColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        enabled: true,
        footerFontColor: theme.palette.text.secondary,
        intersect: false,
        mode: 'index',
        titleFontColor: theme.palette.text.primary
      }
    };
  
    const devices = [
      {
        title: 'Approved',
        value: Math.round(appr/tot*100),
        icon: ThumbUpOutlinedIcon,
        color: colors.green[600]
      },
      {
        title: 'Rejected',
        value: Math.round(rej/tot*100),
        icon: ThumbDownOutlinedIcon,
        color: colors.red[900]
      },
      {
        title: 'Pending',
        value: Math.round(pend/tot*100),
        icon: TimerOutlinedIcon,
        color: colors.orange[600]
      }
    ];
    return (
      <Card>
        <CardHeader title="Courses" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 300,
              position: 'relative'
            }}
          >
            <Doughnut
              data={data}
              options={options}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 2
            }}
          >
            {devices.map(({
              color,
              icon: Icon,
              title,
              value
            }) => (
              <Box
                key={title}
                sx={{
                  p: 1,
                  textAlign: 'center'
                }}
              >
                <Icon color="action" />
                <Typography
                  color="textPrimary"
                  variant="body1"
                >
                  {title}
                </Typography>
                <Typography
                  style={{ color }}
                  variant="h2"
                >
                  {value}
                  %
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }else{
    const devices = [
      {
        title: 'Approved',
        value: 0,
        icon: ThumbUpOutlinedIcon,
        color: colors.green[600]
      },
      {
        title: 'Rejected',
        value: 0,
        icon: ThumbDownOutlinedIcon,
        color: colors.red[900]
      },
      {
        title: 'Pending',
        value: 0,
        icon: TimerOutlinedIcon,
        color: colors.orange[600]
      }
    ];
    return (
      <Card>
        <CardHeader title="Courses" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 300,
              position: 'relative'
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 2
            }}
          >
            {devices.map(({
              color,
              icon: Icon,
              title,
              value
            }) => (
              <Box
                key={title}
                sx={{
                  p: 1,
                  textAlign: 'center'
                }}
              >
                <Icon color="action" />
                <Typography
                  color="textPrimary"
                  variant="body1"
                >
                  {title}
                </Typography>
                <CircularProgress color="inherit" />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }
  


  

  
};

const mapStateToProps = (state) => {
  return {
    courseLoaded: state.auth.courseLoaded,
    coursesData: state.auth.coursesData,
  };
};
export default connect(mapStateToProps)(TrafficByDevice);
