import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

import {refreshRows } from "../actions/action.auth";
import Budget from '../components/dashboard//Budget';
import TasksProgress from '../components/dashboard//TasksProgress';
import TotalCustomers from '../components/dashboard//TotalCustomers';
import TotalProfit from '../components/dashboard//TotalProfit';
import TrafficByDevice from '../components/dashboard//TrafficByDevice';

function Dashboard({refreshRows,isAuthenticated,courseLoaded }){
  const user = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem("ec",false)
  const navigate = useNavigate();
  if (user==null ){
    window.location.reload(false);

  }else{
    refreshRows();
  }
  return(
  <>
    <Helmet>Kit
      <title>Dashboard | AEMS</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit />
          </Grid>
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid> */}
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  </>
);}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    courseLoaded: state.auth.courseLoaded,
    coursesData: state.auth.coursesData,


  };
};
export default connect(mapStateToProps, { refreshRows })(Dashboard);
