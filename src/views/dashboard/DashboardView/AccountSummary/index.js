import React, {
  useState,
  memo,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import {useSelector,useDispatch} from 'src/store';
import {
  Card,
  CardHeader,
  Grid,
  Box,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
  makeStyles,
  useTheme,
  useEventCallback
} from '@material-ui/core';

import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import LinearProgress from './Linear';
import Caption from './Caption';
import Chart2 from './Chart2';
import Chart3 from './apexChart';

import DateRangeComponent from 'src/components/DateRangeButton';




const useStyles = makeStyles(() => ({
  colorPrimary: {
    backgroundColor: '#ececec',
  },

  /*GRAPH*/
  barColorAccepted: {
    backgroundColor: '#b9d3b6',
  },
  barColorBooked: {
    backgroundColor: '#00adef',
  },

  barColorShippready: {
    backgroundColor: '#03a596',
  },
  barColorArrival: {
    backgroundColor: '#7e5e7b',
  },
  barColorIntransit: {
    backgroundColor: '#ffc212',

  },
  barColorDelivered: {
    backgroundColor: '#c6d53f',
  },
  barColorReturn: {
    backgroundColor: '#ed1f60',
  },
  summaryLink: {
    color: '#333'
  }
}));

const RadialChart = ({fetchDashboardSummary,SummaryDate,summaryData,user,summaryLoading}) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const [earnings,setEarnings]=useState(null);
  const [summary,setSummary]=useState([]);
  const startDate = SummaryDate[0].startDate;
  const endDate = SummaryDate[0].endDate;


console.log(summaryData.length)



// const fetchSummary=useCallback(()=>{
//   console.log('Call_back');
//   dispatch(fetchDashboardSummary(startDate,endDate,user.acno));
// },[])


  // useEffect(()=>{
  //   fetchSummary();
  // },[fetchSummary])

  const getSummary=useCallback(async()=>{
    console.log('useCallback',1);
    try {
      // const response = await axios.get('/api/customers');
      // dispatch(fetchDashboardSummary(startDate,endDate,user.acno));
      if (isMountedRef.current){
        setSummary(summaryData);
      }
    } 
    catch(err){
      console.log(err);
      console.error('error=>',err);
    }
  },[]);




  // useEffect(()=>{
  //   console.log('useEffect',2);
  //   getSummary();
  // },[getSummary]);
  // useEffect(()=>{
  //   // dispatch(fetchDashboardSummary(startDate,endDate,user.acno));
  //   fetchDashboardSummary(startDate,endDate,user.acno);
  // },[]);

  const array=useMemo(()=>{
    console.log('use Memo');
    return summaryData
  },[])
  

  // useEffect(()=>{
  // // dispatch(fetchDashboardSummary(startDate,endDate,user.acno))
  // fetchDashboardSummary(startDate,endDate,user.acno);
  // },[fetchDashboardSummary]);

  // const getSummary = useCallback(async () => {
  //   try {
  //     const response = await axios.get('/api/reports/earnings');
  //     if (isMountedRef.current) {
  //       setEarnings(response.data.earnings);
  //     }
  //   } catch (err) {

  //   }
  // }, [isMountedRef]);

  // useEffect(() => {
  //   getSummary();
  // }, [getSummary, summaryLoading]);
  // if (!earnings) {
  //   return null;
  // }

  const getShippmentSummary = (arg1,arg2,arg3,arg4) => {
    // dispatch(
    //   fetchDashboardSummary(arg1,arg2,arg3)
    // )

   
      fetchDashboardSummary(arg1,arg2,arg3,arg4)
    
  }
  return (
    <Card>
      <CardHeader
        action={
        <DateRangeComponent
          fetchdata={getShippmentSummary}
          startDate={startDate}
          endDate={endDate}
        />
        }
        title="Account Summary"
      />
      <Divider />
      <CardContent>
        {
        
       

        summaryData.length==0  || summaryLoading == true? <Box
          mt={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={600}>
          <CircularProgress />
        </Box>:


          <Grid
            container
            spacing={1}
          >
            <Grid item
              lg={6}
              xs={12}
            >
              <Caption
                heading={'Shipments Booked'}
                number={
                  Intl.NumberFormat().format(
                    Number(summaryData.booked) 
                  )}
              />

{/* <Chart3 
donutData={[3,5,6,7,8]} 
chartOptions={['aa1','bb1','cc1','dd1']} 
labels={[11,12,13,14,15,16]}
/> */}
              <Chart2
              title='hello Bisma'
              array={array}
              data={{
              datasets:[
              {
                data: [
                        summaryData.accepted,
                        summaryData.booked,
                        summaryData.readyforpickup
                      ],
                      backgroundColor:[
                        '#b9d3b6',
                        '#00adef',
                        '#03a596',
                      ]
                    }
                  ],
                  labels: ['Accepted','Booked','Readyforpickup']
                }}
              />


              <LinearProgress
                variant="determinate"
                value={parseInt(summaryData.accepted)}
                link={'Accepted Shipments'}
                classes={{colorPrimary:classes.colorPrimary,barColorPrimary:classes.barColorAccepted}}
              />

              <LinearProgress
              variant="determinate"
                value={parseInt(summaryData.notarrival)}
                link={'Booked Shipments'}
                classes={{colorPrimary:classes.colorPrimary, barColorPrimary:classes.barColorBooked}}
              />
              <LinearProgress
                variant="determinate" 
                value={parseInt(summaryData.readyforpickup)}
                link={'Shipments Ready For Pickup'}
                classes={{colorPrimary:classes.colorPrimary, barColorPrimary: classes.barColorReturn}}
              />

            </Grid>
            <Grid item
              lg={6}
              xs={12}
            >

              <Caption
                heading={'Shipments Accepted'}
                number={Intl.NumberFormat().format(summaryData.accepted)}
              />
              <Chart2
                data={{
                  datasets:[
                    {
                      data:[
                        summaryData.accepted, summaryData.booked, summaryData.intransit,
                        summaryData.arrival, summaryData.delivered, summaryData.readyforpickup
                      ],
                      backgroundColor:[
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                      ]
                    }
                  ],
                  labels:['Accepted','Booked','Intransit','Arrival','Delivered','ReadyForPickup']
                }}
              />

              <LinearProgress
                variant="buffer" 
                value={parseInt(summaryData.arrival)}
                valueBuffer={parseInt(summaryData.accepted)/parseInt(summaryData.arrival) * 100}
                link={'Arrived Shipments'}
                classes={{colorPrimary:classes.colorPrimary,barColorPrimary:classes.barColorArrival}}
              />

              <LinearProgress
                variant="buffer" 
                value={parseInt(summaryData.intransit)}
                valueBuffer={parseInt(summaryData.accepted)/parseInt(summaryData.intransit) * 100}
                link={'In-Transit Shipments'}
                classes={{colorPrimary:classes.colorPrimary,barColorPrimary:classes.barColorIntransit}}
              />
{parseInt(summaryData.delivered)}

              <LinearProgress
                variant="buffer" 
                value={parseInt(summaryData.delivered)}
                valueBuffer={parseInt(summaryData.accepted)/parseInt(summaryData.delivered) *100}
                link={'Delivered Shipments'}
                classes={{colorPrimary:classes.colorPrimary,barColorPrimary:classes.barColorDelivered }}
              />
{/* `${summaryData.returndelivered}/${summaryData.return }` */}
              <LinearProgress
                variant="determinate"
                value= {`${parseInt(summaryData.return)!==0 ? parseInt(summaryData.returndelivered)/ parseInt(summaryData.return)*100 :''}`}
                link={` ${summaryData.returndelivered}/${summaryData.return } Returns - Delivered / Total`}
                classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorReturn }}
              />
            </Grid>
          </Grid>
        }
      </CardContent>
    </Card>
  );
};
export default memo(RadialChart);
