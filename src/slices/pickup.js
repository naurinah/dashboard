import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {addDays} from 'date-fns';
import {PickupLists} from '../apis/apiUrl'
const initialState = {
    PickupList:[],
    PickupListLoading:false,
    PickupListError:false
}

const pickupSlice=createSlice({
name:'pickups',
initialState,
reducers:{
    getPickupList:(state)=>{
        state.PickupsLoading=true;
    },
    getPickupListSuccess:(state,action)=>{
        state.PickupListLoading=false;
        state.PickupListError=false;
        state.PickupList=action.payload;
    },
    getPickupListError:(state,action)=>{
        state.PickupListError=action.payload;
    },
    extraReducers:{
    }
}
})
export const {
    getPickupList,getPickupListSuccess,getPickupListError
    }=pickupSlice.actions;

//selector
export const pickupsSelector=state =>state.pickups;
//
export const reducer=pickupSlice.reducer;
export const fetch_PickupList=(account_number)=>async(dispatch)=>{
dispatch(getPickupList());
try{
    var formdata=new FormData();
    var obj={acno:account_number};
    var myJSON =JSON.stringify(obj);
    formdata.append("request",myJSON);
    var requestOptions={
    method:'POST',
    body:formdata,
    redirect:'follow'
    };
// let queryString =new URLSearchParams();
// queryString.append('acno',account_number);
const fetchPickups=await fetch(PickupLists,requestOptions);
const data=await fetchPickups.json();
dispatch(getPickupListSuccess(data));
}
catch(err){
dispatch(getPickupListError(err));
console.log('error==>',err);
console.log(err);
}
}


export default pickupSlice;