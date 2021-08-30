import React,{useState,useEffect} from 'react';
import {Container,Box,makeStyles,Card,CardHeader} from '@material-ui/core';
import Header from './Header';
import Page from 'src/components/Page';
import MultiTrack from './PickupList';

import useAuth from 'src/hooks/useAuth';
import {useSelector,useDispatch} from 'src/store';
import {pickupsSelector,fetch_PickupList} from 'src/slices/pickup';
const useStyles=makeStyles((theme)=>({
    root:{
      backgroundColor:theme.palette.background.dark,
      minHeight:'100%',
      paddingTop:theme.spacing(3),
      paddingBottom:theme.spacing(3)
    }
}));
const PickupView=()=>{
const [pickup,setPickup]=useState([]);
const {user}=useAuth();
const dispatch=useDispatch();
const {PickupList,PickupListLoading,PickupListError}=useSelector(pickupsSelector);

useEffect(()=>{
  console.log('PickupListError',PickupListError);
  console.log('pickuplist',PickupList);
  console.log('loading',PickupListLoading);
dispatch(fetch_PickupList(user.acno));
setPickup(PickupList);
},[dispatch]);



const classes=useStyles();
return (
        <Page
        className={classes.root}
        title="PickupList"
      >
        <Container 
        maxWidth={false}>
           <Header />
<Card>
  <CardHeader
  title="PickupList"
  />
     <Box 
     mt={3}>
            {/* <Results customers={customers} /> */}
            <MultiTrack 
            loading={PickupListLoading}
            pickup={PickupList}/>
          </Box>
    </Card>
        </Container>
      </Page>
    )
}
export default PickupView;
