import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {Booking,fetch_Location,insertLocation,make_default,delete_Location,edit_Location} from '../apis/apiUrl';
const initialState={


    booking:[],
    booking_error:false,
    location:[],
    location_success:false,
    location_error:false,
    selected_Location:[],
    selected_location_error:false,
    location_loading:true,
    submit_location:[],
    submit_location_error:false,
    default_location:'',
    edit_data:[],
    edit_error:false,
    delete_data:[],
    delete_error:false,
    default_data:[],
    default_error:false
}

const bookingSlice=createSlice({
    name:'booking',
    initialState,
    reducers:{

        submit_booking:(state,action)=>{
            state.booking=action.payload;
            state.booking_error=true;
        },
        submit_booking_error:(state,action)=>{
            state.booking_error=true;
        },
        get_locations:(state,action)=>{
              state.location_error=false;
              state.location=action.payload;
              state.location_success=false;     
        },
        get_locations_error:(state,action)=>{
             state.location_error=true;
        },
        get_selected_location:(state,action)=>{
            state.location_loading=false;
            state.default_location=action.payload[0].DEFAULT;
            state.selected_Location=action.payload;

        },
        selected_location_error:(state,action)=>{
            state.selected_location_error=action.payload;
            state.location_loading=false;
        },

        submit_locations:(state,action)=>{
            state.submit_location=action.payload;
            state.submit_location_error=false;
        },
        submit_locations_err:(state,action)=>{
            state.submit_location_error=true;
        },

        edit_error:(state)=>{
            state.edit_error=true;
        },
        edit_location:(state,action)=>{
            state.edit_data=action.payload;
            // state.location=action.payload.detail;
            state.edit_error=false;
        },
        delete_location:(state,action)=>{
            state.delete_data=action.payload
            state.delete_error=false
        },

        delete_error:(state)=>{
        state.delete_error=true
        },

        default_location:(state,action)=>{
            state.default_data=action.payload;
            state.default_error=false;

        },
        default_location_error:(state,action)=>{
            state.default_error=true;
        }
    }
})
export const {submit_booking,submit_booking_error,get_locations,get_locations_error,get_selected_location,selected_location_error,submit_locations,submit_locations_err,edit_location,edit_error,delete_location,delete_error,default_location,default_location_error}=bookingSlice.actions;
export const bookingSelector=state=>state.booking;
export const reducer=bookingSlice.reducer;

export const submitBooking=(
    con_name,con_add,con_mail,con_cont,dest_country,
    dest_city,service_code,orig_city,pickupLocation,shp_name,
    shp_add,shp_mail,shp_cont,
    prod_detail,pcs,wgt,
    prod_value,cust_ref,coment,
    ptype,document,cbc,
    fragile,insur,insur_value,acno
    )=>async(dispatch)=>{
    try{
        // ptype= ptype==true?'Y':'N';
        // cbc=cbc==true?'Y':'N';
        // fragile=fragile==true?'Y':'N';
        // insur=insur==true?'Y':'N';
        var formdata = new FormData();
        formdata.append("prod_value",prod_value);
        formdata.append("salediscount",'');
        formdata.append("con_name",con_name);
        formdata.append("con_add",con_add);
        formdata.append("cbc",cbc);
        formdata.append("orig_city",orig_city);
        formdata.append("dest_country",dest_country);
        formdata.append("dest_city",dest_city);
        formdata.append("insur",insur);
        formdata.append("coment",coment);
        formdata.append("prod_detail",prod_detail);
        formdata.append("service_code",service_code);
        formdata.append("ptype",ptype);
        formdata.append("pcs",pcs);
        formdata.append("wgt",wgt);
        formdata.append("fragile",fragile);
        formdata.append("cust_ref",cust_ref);
        formdata.append("shp_name",shp_name);
        formdata.append("shp_add",shp_add);
        formdata.append("shp_cont",shp_cont);
        formdata.append("shp_mail",shp_mail);
        formdata.append("storeid",'');
        formdata.append("booking_type",'SB');
        formdata.append("insur_value",'');
        // formdata.append("insur_value",insur_value);
        formdata.append("acno",'KHI-00114');
        // formdata.append("acno",acno);
        formdata.append("con_cont",con_cont);
        formdata.append("con_mail",con_mail);

        var requestOptions={
            method: 'POST',
            body: formdata,
        };

    
    const booking=await fetch(Booking,requestOptions);
    const Booking_json=await booking.json();

    // const Booking_json=await booking.text();
    dispatch(submit_booking(Booking_json));
    }
    catch(err){
        dispatch(submit_booking_error(err));
    }
}
export const fetch_all_locations=(acno,id)=>async(dispatch)=>{
try{
var single_id='Y';
let queryString =new URLSearchParams();
let queryString2 =new URLSearchParams();
queryString.append('acno',acno);
queryString.append('id',id);
queryString2.append('acno',acno);
queryString2.append('id',single_id);
const fetch_all_location=await fetch(`${fetch_Location}${queryString}`);
const cities_all_Data=await fetch_all_location.json();
dispatch(get_locations(cities_all_Data));
var filteredData=cities_all_Data ? cities_all_Data.detail.filter((city,id)=>city.DEFAULT=='Y'):[];
dispatch(get_selected_location(filteredData))

// const fetch_selected_location=await fetch(`${fetch_Location}${queryString2}`);
// const locationData=await fetch_selected_location.json();



}
catch(err){
dispatch(get_locations_error(err));
}
}
export const fetch_selected_location=(acno,id)=>async(dispatch)=>{
try{
let queryString =new URLSearchParams();
queryString.append('acno',acno);
queryString.append('id',id);
const selected_Location=await fetch(`${fetch_Location}${queryString}`);
const locationData=await selected_Location.json();
dispatch(get_selected_location(locationData.detail));
    }

catch(err){
dispatch(selected_location_error(err))
    }
}
export const submit_pickupLocation=(location,contact,email,origin_city,address,acno)=>async(dispatch)=>{   
    try{
        // values.location_name,values.contact_number,values.location_email,values.orig_city,values.location_address,acno
        var formdata = new FormData();
        // formdata.append("location",location);
        // formdata.append("name",name);
        // formdata.append("contact",contact);
        // formdata.append("email",email);
        // formdata.append("origincity",origin_city);
        // formdata.append("acno",acno);
        // var obj={'request':formdata};
        // var myJSON=JSON.stringify(obj);
        // formdata.append("request",myJSON);

        var formdata = new FormData();
        var obj={
            location:address,
            name:location,
            contact:contact,
            email:email,
            origincity:origin_city,
            acno:acno    
        }
        var myJSON =JSON.stringify(obj);
        formdata.append("request",myJSON);
        var requestOptions={
            method: 'POST',
            body: formdata,
        };

        const insert_Location=await fetch(insertLocation,requestOptions);
        const location_success=await insert_Location.json();
        dispatch(submit_locations(location_success));

    }
catch(err){
    console.log('err=>',err);
dispatch(submit_locations_err(err));
    }

}

export const editLocation=(location,contact,email,origincity,address,id,acno)=>async(dispatch)=>{
    // values.location_name,values.location_contact,values.location_email,values.orig_city,values.location_address,values.id,values.acno
    // console.log('my-location=',location);
    // console.log('contact=',contact);
    // console.log('email=',email);
    // console.log('acno=',acno);
    // console.log('origin=',origincity);
    // console.log('id=',id);
    try{
        var formdata =new FormData();
        var obj={
            location:'None',
            name:location,
            contact:contact,
            email:email,
            origincity:origincity,
            acno:acno,
            id:id
        }
        var myJSON =JSON.stringify(obj);
        formdata.append("request",myJSON);
        var requestOptions={
            method: 'POST',
            body: formdata,
        };
        
        const editLocation=await fetch(edit_Location,requestOptions);
        const editsuccess=await editLocation.json();
        console.log('location',editLocation);
        console.log('edit_success===>',editsuccess);
        dispatch(edit_location(editsuccess));
    }
    catch(err){
        console.log(err);
        console.log('err=',err);
        dispatch(edit_error(err));
    }
}

export const deleteLocation=(id,acno)=>async(dispatch)=>{
    try{

        var formdata = new FormData();
        formdata.append("id",id);
        formdata.append("acno",acno);
        var requestOptions={
            method: 'POST',
            body: formdata,
        };

        let queryString =new URLSearchParams();
        queryString.append('acno',acno);
        queryString.append('id',id);
        const deleteLocation=await fetch(`${delete_Location}${queryString}`);
        const deletionsuccess=await deleteLocation.json();
        console.log('success=>',deletionsuccess);
        dispatch(delete_location(deletionsuccess));
    }
    catch(err){
        dispatch(delete_error(err));
    }
}

export const makeDefault_Location=(id,acno)=>async(dispatch)=>{
    try{
        var formdata = new FormData();
        formdata.append("id",id);
        formdata.append("acno",acno);
        
        var requestOptions={
            method: 'POST',
            body: formdata,
        };
        let queryString =new URLSearchParams();
        queryString.append('acno',acno);
        queryString.append('id',id);
        const defaultLocation=await fetch(`${make_default}${queryString}`);
        const defaultsuccess=await defaultLocation.json();
        console.log('success=>',defaultsuccess);
        dispatch(default_location(defaultsuccess));

    }
    catch(err){
       
        dispatch(default_location_error(err));

    }

}
export default bookingSlice;