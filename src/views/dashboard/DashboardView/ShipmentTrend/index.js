import React,
{ useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Container,
  Divider,
Paper,
  Typography,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import {useSelector,useDispatch } from 'src/store';
import {fetchShippementTrend,dashboardSelector} from  'src/slices/dashboard';
import DateRangeButton from 'src/components/DateRangeButton';
import Chart from './Chart';
import useAuth from 'src/hooks/useAuth';



const useStyles = makeStyles((theme) => ({
  root: {

  },
  chart: {
    height: '100%'
  },
  paper_item: {
    padding: theme.spacing(1),
    width: '25%',
   
  }
}));

const ShipmentTrend = ({ className, ...rest }) => {
  const dispatch = useDispatch();
  const { shipmentLoading, shipmentData,shipmentError,ShipmentDate,a,y}=useSelector(dashboardSelector);
  const startDate = ShipmentDate[0].startDate;
  const endDate = ShipmentDate[0].endDate;
  const [shiptrends, setShipTrend]=useState({});
  const {user}=useAuth();

  useEffect(()=>{
    dispatch(fetchShippementTrend(startDate,endDate,user.acno));
    console.log('shiptrend==',a);
    console.log('shiptrend==',y);
    console.log('shipmentLoading==>',shipmentLoading);
  }, []);

  const getShippmentTrend=(arg1, arg2,arg3,arg4) => {
    dispatch(
      fetchShippementTrend(arg1,arg2,arg3,arg4)
    )
  }
  const classes = useStyles();
  const performance = {
    thisWeek: {
      data: [],
      labels: []
    },
    thisMonth: {
      data: [],
      labels: []
    },
    thisYear: {
      data: [10, 5, 11, 20, 13, 28, 18, 4, 13, 12, 13, 5],
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    }
  };
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<DateRangeButton
          fetchdata={getShippmentTrend}
          startDate={startDate}
          endDate={endDate}
        />}
        title="Shippment Trend"
      />
      <Divider />

      {
      
      shipmentLoading==true || (a.length==0 && y.length==0) ?

      <Box
       mt={5}
       display="flex"
       justifyContent="center"
       alignItems="center"
       minHeight={320}>
       <CircularProgress />
       </Box>
       :
      <>
      <Box display="flex">
      <Paper className={classes.paper_item}>
        <Typography
          variant="h6" display="block" gutterBottom>
          Shipments
                </Typography>
        <Typography
          gutterBottom
          variant="h3">
          {shipmentData.totalshipment!='NaN'? Intl.NumberFormat().format(shipmentData.totalshipment):10}
        </Typography>
      </Paper>

      <Paper className={classes.paper_item}>
        <Typography
          variant="h6" display="block" gutterBottom>
          COD
                </Typography>
        <Typography
          gutterBottom
          variant="h3">
          {shipmentData.codamount!='NaN'? Intl.NumberFormat().format(shipmentData.codamount):0}
        </Typography>
      </Paper>

      <Paper className={classes.paper_item}>
        <Typography
          variant="h6" display="block" gutterBottom>
       Service Charges
                </Typography>
        <Typography
          gutterBottom
          variant="h3">
          {shipmentData.blueexcharges!='NaN'?Intl.NumberFormat().format(shipmentData.blueexcharges):0}
        </Typography>
      </Paper>
      <Paper className={classes.paper_item}>
        <Typography
          variant="h6" display="block" gutterBottom>
          Amount Settle
                </Typography>
        <Typography
          gutterBottom
          variant="h3">
          {shipmentData.net!='NaN'? Intl.NumberFormat().format(shipmentData.net):0}
        </Typography>
        
      </Paper>
      </Box>
      <CardContent>
        {/* <PerfectScrollbar> */}
          <Box
            height={550}
            minWidth={600}
          >
              <Chart
                className={classes.chart}
                data={a}
                labels={y}
                // data={performance.thisYear.data}
                // labels={performance.thisYear.labels}
                a={shipmentData.a}
                y={shipmentData.y}
                shipdata={shipmentData}
              />
          </Box>
        {/* </PerfectScrollbar> */}
      
      </CardContent>
      </>
       
       }

    </Card>
  );
};
ShipmentTrend.propTypes = {
className: PropTypes.string
};
export default ShipmentTrend;
