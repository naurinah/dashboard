import React,{useState,useEffect}from 'react';
import {Container,Box,makeStyles,Card,CardHeader} from '@material-ui/core';
import Header from './Header';
import Page from 'src/components/Page';
import PickupLocation from './pickupLocation';
import useAuth from 'src/hooks/useAuth';
import {useSelector,useDispatch} from 'src/store';
import {submitBooking,bookingSelector,fetch_all_locations,fetch_selected_location,editLocation,deleteLocation,makeDefault_Location} from 'src/slices/booking';
import {pickupsSelector,fetch_PickupList} from 'src/slices/pickup';

const useStyles=makeStyles((theme)=>({
    root:{
      backgroundColor:theme.palette.background.dark,
      minHeight:'100%',
      paddingTop:theme.spacing(3),
      paddingBottom:theme.spacing(3)
    }
}));



const LocationListView=()=>{
const classes=useStyles();
const [allLocation,setLocations]=useState([]);
const {user}=useAuth();
const {acno} = user;
const dispatch=useDispatch();
const {PickupList,PickupListLoading,PickupListError}=useSelector(pickupsSelector);
const {booking,booking_error,location,location_success,location_error,selected_Location,selected_location_error,location_loading,default_location,edit_data,delete_data,default_data,submit_location} = useSelector(bookingSelector);

useEffect(()=>{
 
// dispatch(fetch_PickupList(user.acno));
dispatch(fetch_all_locations(acno,'all'));
setLocations(location.detail);
},[dispatch,edit_data,delete_data]);
console.log('location list view');
console.log('location_view[]',location);
    return(
        <Page
        className={classes.root}
        title="Pickup Location List"
      >
        <Container 
        maxWidth={false}>
           <Header />
<Card>
  <CardHeader
  title="Pickup Location List"
  />

     <Box 
     mt={3}>
            <PickupLocation 
            loading={PickupListLoading}
            pickup={location.detail} 
            editfunc={editLocation}
            editdata={edit_data}
            delete_data={delete_data}
            deletefunc={deleteLocation}
            makedefault={makeDefault_Location}
            default_data={default_data}
            acno={acno}
             />
          </Box>
    </Card>
        </Container>
      </Page>
    )
}
export default LocationListView;
