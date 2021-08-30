import React,{useCallback,useEffect} from 'react';
import {
  Container,
  Grid,
  Box,
  Divider,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useDispatch, useSelector } from 'src/store';
import {fetchDashboardSummary,dashboardSelector} from 'src/slices/dashboard';
import useAuth from 'src/hooks/useAuth';
import Page from 'src/components/Page';
import Header from './Header';
import LatestProjects from './LatestProjects';
import NewProjects from './NewProjects';
import ShipmentTrend from './ShipmentTrend';
import AccountSummary from './AccountSummary';
import SettlementHistory from './SettlementHistory';




import EarningsSegmentation from './EarningsSegmentation';
// import RadialChart  from './RadialChart ';
// import RadialChart from './RadialChart';
import RealTime from './RealTime';
import RoiPerCustomer from './RoiPerCustomer';
import SystemHealth from './SystemHealth';
import TeamTasks from './TeamTasks';
import TodaysMoney from './TodaysMoney';



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const DashboardView = () => {
const classes = useStyles();
const {user,logout}=useAuth();
  const dispatch = useDispatch();
  const {summaryLoading,summaryData,SummaryDate}=useSelector(dashboardSelector);
  const startDate = SummaryDate[0].startDate;
  const endDate = SummaryDate[0].endDate;
  const Summary=useCallback((startDate,endDate,account,loading)=>{
    dispatch(fetchDashboardSummary(startDate,endDate,account,loading));
  },[])

    useEffect(()=>{
      Summary(startDate,endDate,user.acno);
  },[])

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container   maxWidth={false}>
        <Header />
       
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={8}
            md={8}
            xs={12}
          >
<AccountSummary
fetchDashboardSummary={Summary}
SummaryDate={SummaryDate}
summaryData={summaryData}
user={user}
summaryLoading={summaryLoading}


/>
            {/* <PerformanceOverTime /> */}
            {/* <EarningsSegmentation /> */}
            {/* {/* <AccountSummary /> */}
            {/* <AccountSummary /> */} 
            {/* <RadialChart /> */}
          </Grid>


          {/* <Grid
            item
            lg={4}
            xs={12}
          > */}
            {/* <PerformanceOverTime /> */}
            {/* <EarningsSegmentation /> */}
            {/* <RadialChart /> */}
          {/* </Grid> */}
          <Grid
            item
            lg={4}
            md={4}
            xs={12}
          >
            {/* <RealTime /> */}
            <SettlementHistory/>
          </Grid>

          <Grid
            item
            lg={12}
            xl={12}
            xs={12}
          >
          <ShipmentTrend />
          </Grid>
         
        </Grid>
      </Container>
    </Page>
  );
};
export default DashboardView;
