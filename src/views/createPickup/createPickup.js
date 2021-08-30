import React,{useState,useEffect} from 'react';
import {Grid} from '@material-ui/core';
import { useSelector, useDispatch } from 'src/store';
import {check_status_of_Cn,statusSelector} from 'src/slices/cnstatus';
import BookedCard from './BookedCn';
import CreatePickupList from './PickupList';


const CreatePickup=()=>{
const [pickup,setPickup]=useState([]);
const {status,status_error}=useSelector(statusSelector);
const dispatch=useDispatch();

useEffect(()=>{
},[]);

    return (
        <Grid container>
            <Grid 
            item
            lg={12}
            xs={12}
            >
<BookedCard/>
            </Grid>

            <Grid 
            item
            lg={12}
            xs={12}
            >
                
<CreatePickupList/>
            </Grid>
        </Grid>
    )
}
export default CreatePickup;
