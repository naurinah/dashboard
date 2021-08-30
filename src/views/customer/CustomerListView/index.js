import React, {
  useState,
  useEffect,
  useCallback,
  memo
} from 'react';
import {
  Box,
  Container,
  Card,
  CardHeader,
  Typography,
  Divider,
  makeStyles
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';

import {useSelector,useDispatch} from 'src/store';
import {fetchDeliveries,dashboardSelector,fetchDeliveriesCustom} from 'src/slices/dashboard';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import DateRangeComponent from 'src/components/DateRangeButton';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Deliveries';

const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor:theme.palette.background.dark,
    minHeight:'100%',
    paddingTop:theme.spacing(3),
    paddingBottom:theme.spacing(3)}
}));



  const CustomerListView = () => {
  const dispatch=useDispatch();
  const {Deliveries,deliveriesLoding,ShipmentDate}=useSelector(dashboardSelector);
  const startDate=ShipmentDate[0].startDate;
  const endDate =ShipmentDate[0].endDate;
  const classes =useStyles();
  const isMountedRef=useIsMountedRef();
  const [customers,setCustomers] = useState([]);
  const {user}=useAuth();

  const getDeliveries=(arg1,arg2,arg3,arg4)=>{
  dispatch(
      fetchDeliveriesCustom(arg1,arg2,arg3,arg4)
    )
  }
  


  const getCustomers=useCallback(async ()=>{
    try {
      // const response = await axios.get('/api/customers');
      dispatch(fetchDeliveriesCustom(startDate,endDate,user.acno));
      console.log(isMountedRef.current);
      // if (isMountedRef.current){
        // setCustomers(response.data.customers);
        setCustomers(Deliveries);
      // }
    } catch (err) {
      console.error(err);
    }
  }, [startDate,endDate]);


  useEffect(() => {
    getCustomers();
  },[getCustomers]);



  // useEffect(()=>{ 
  // // dispatch(fetchDeliveries(startDate,endDate,user.acno));
  // dispatch(fetchDeliveriesCustom(startDate,endDate,user.acno));
  //  },[dispatch]);
   return(
    <Page
      className={classes.root}
      title="Customer List"
    >
      <Container maxWidth={false}>
        <Header />
        {/* <DateRangeComponent
          fetchdata={getDeliveries}
        />
        <Box mt={3}>
          <Results customers={customers} deliveries={Deliveries} />
        </Box> */}
<Card>
  <CardHeader
        action={<DateRangeComponent
        startDate={startDate}
        endDate={endDate}
        fetchdata={getDeliveries}
        />}
        title="Delivery List"
      />
      <Box mt={3}>
          <Results  
          loading={deliveriesLoding} 
          customers={customers}
          deliveries={Deliveries}
           />
        </Box>
    </Card>
      </Container>
    </Page>
  );
};
export default memo(CustomerListView);
