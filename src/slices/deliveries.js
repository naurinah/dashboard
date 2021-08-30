import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {addDays} from 'date-fns';
import swal from 'sweetalert';
import {createLoadSheet,voidConsignment,updateProfile} from '../apis/apiUrl'
const initialState = {
    Pickup:[],
    pickupLoading: false,
    pickupError: false,
    CancelPickup:[],
    cancelPickupLoading:false,
    cancelPickupError:false,
    Profile:[],
    profileLoading:false,
    profileError:false
}
// export const fetchPickup = createAsyncThunk(
//     'deliveries/fetchPickup',
//     async (acno, usrid, cnno) => {
//         console.log(acno);
//         console.log(usrid);
//         console.log(cnno);
//         var formdata = new FormData();
//         var obj = { acno: acno, usrid: usrid, cndetail: cnno };
//         var myJSON = JSON.stringify(obj);
//         formdata.append("request", myJSON);
//         var requestOptions = {
//             method: 'POST',
//             body: formdata,
//         };

//         const response = await fetch(createLoadSheet, requestOptions)
//         const data = await response.json();
//         // return data;
//     }
// )

export const fetchPickup=createAsyncThunk("deliveries/fetchPickup", (acno, usrid, cnno) => {
        var formdata = new FormData();
        var obj={acno:acno,usrid:usrid,cndetail:cnno};
        var myJSON=JSON.stringify(obj);
        formdata.append("request", myJSON);
        var requestOptions={
            method: 'POST',
            body: formdata,
        };
    return fetch(createLoadSheet,requestOptions)
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(json => json);
  });


const deliverySlice=createSlice({
    name:'deliveries',
    initialState,
    reducers:{
        getPickup:(state)=>{
            state.pickupLoading = true;
        },
        getPickupSuccess:(state,action)=>{
            state.pickupLoading = false;
            state.pickupError = false;
            state.Pickup=action.payload;
        },
        getPickupError:(state,action)=>{
            state.pickupError = true;
        },
        getcancelPickup:(state)=>{
            state.cancelPickupLoading=true;
        },
        getcancelPickupSuccess:(state,action)=>{
            state.CancelPickup=action.payload;
        },
        getcancelPickupError:(state)=>{
            state.cancelPickupError=true;
        },
        getProfile:(state)=>{
        state.profileLoading=true;
        },
        getProfileSuccess:(state,action)=>{
       state.profileLoading=true;
       state.Profile=action.payload;
        },
        getProfileError:(state,action)=>{
            state.Profile=action.payload;
            state.profileLoading=true;
        }
    },
    extraReducers:{
        [fetchPickup.pending]:(state) =>{
        state.pickupLoading = true;
        },
        [fetchPickup.fulfilled]: (state, action) =>{
        state.pickupLoading = false;
        state.pickupError = false;
        state.Pickup = action.payload;
        },
        [fetchPickup.rejected]: (state,action) =>{
        state.pickupLoading = true;
        state.Pickup = action.payload;
        },
    }
})
//action creater from createSlice
//summary
export const {
getPickup,getPickupSuccess,getPickupError,
getcancelPickup,getcancelPickupSuccess,getcancelPickupError,
getProfile,getProfileSuccess,getProfileError
}=deliverySlice.actions;
//selector
export const deliveriesSelector=state=>state.deliveries;
//reducer
export const reducer=deliverySlice.reducer;

export const createPickups=(Cnno,Account,Name,flag=true)=>async(dispatch)=>{
    dispatch(getPickup())
    try{  
    if(flag===true){
    var multiple_array=[];
    Cnno.map(ele=>{
    multiple_array=[...multiple_array,{cnno:ele.data[1]}];
              });
    var obj={acno:Account,usrid:Name,cndetail:multiple_array};
        }

if(flag===false){
var obj={acno:Account,usrid:Name,cndetail:[Cnno]};
        }
        var formdata = new FormData();
        // var obj={acno:Account,usrid:Name,cndetail:[Cnno]};
        var myJSON =JSON.stringify(obj);
        formdata.append("request",myJSON);
        var requestOptions={
            method: 'POST',
            body: formdata,
        };
        
        const response=await fetch(createLoadSheet,requestOptions)
        const data=await response.json(response);
        if(data.message=='success')
        swal('success', 'New Pickup Sheet is Successfully Created','success')
        dispatch(getPickupSuccess(data));
    }
    catch(err){
    dispatch(getPickupError(err))
    }
}
export const cancelConsignment=(Cnno,Account,Name)=>async (dispatch)=>{
    dispatch(getcancelPickup());
    try{

        var formdata = new FormData();
        var obj={acno:Account,usrId:Name,cndetail:[Cnno]};
        var myJSON =JSON.stringify(obj);
        formdata.append("request",myJSON);
        var requestOptions={
            method: 'POST',
            body: formdata,
        };

        const cancel_pickup=await fetch(voidConsignment,requestOptions);
        const cancel_consignment=await cancel_pickup.json();

dispatch(getcancelPickupSuccess(cancel_consignment));
    }
    catch(err){
dispatch(getcancelPickupError(err))
    }
}
export const UpdateProfile=(acno,account_title,name,address,cell,email,ntn,cnic,password,usrid)=>async(dispatch)=>{
dispatch(getProfile());

try{

    var formdata = new FormData();
    var obj={
        acno:acno,account_title:account_title,name:name,address:address,
        cell:cell,email:email,ntn:ntn,cnic:cnic,password:password,usrid:usrid
    };
    var myJSON=JSON.stringify(obj);
    formdata.append("request",myJSON);
    var requestOptions={
        method: 'POST',
        body: formdata,
    };
    const update_profile=await fetch(updateProfile,requestOptions);
    const profile_json=await update_profile.json();
dispatch(getProfileSuccess(profile_json))
    }
catch(err){
dispatch(getProfileError(err))
    }
}

export default deliverySlice;