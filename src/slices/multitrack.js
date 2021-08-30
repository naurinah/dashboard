import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {TrackingList1,TrackingList2,TrackingList3,multiTracking,TrackingView} from '../apis/apiUrl';
const initialState={
    Multitrack:[],
    MultitrackLoading:false,
    MultitrackError:false,
    PostMultiTrack:[],
    PostMultiTrackLoading:'',
    PostMultiTrackError:false,
};
const multitrackSlice=createSlice({
name:'multi',
initialState,
reducers:{
    getMultiTrack:(state)=>{
    state.MultitrackLoading=true;
    },
    getMultiTrackSuccess:(state,action)=>{
        state.MultitrackError=false;
        state.Multitrack=action.payload;
        state.MultitrackLoading=false;
    },
    
    getMultiTrackError:(state,action)=>{
        state.MultitrackError=action.payload;
    },
    postMultiTrack:(state)=>{
    state.PostMultiTrackLoading=true;
    },
    postMultiTrackSuccess:(state,action)=>{
      
        state.PostMultiTrackLoading=false;
        state.PostMultiTrackError=false;
        state.PostMultiTrack=action.payload;
    },
    postMultiTrackError:(state,action)=>{
        state.PostMultiTrackError=action.payload;
    },
}
});
export const {getMultiTrack,getMultiTrackSuccess,getMultiTrackError,
    postMultiTrack,postMultiTrackSuccess,postMultiTrackError}=multitrackSlice.actions;
//selector
export const multiTrackSelector=state=>state.multitrack;
//reducer
export const reducer=multitrackSlice.reducer;
export const fetch_MultiTrackSubset1=(user,password,account_number)=>async(dispatch)=>{
const cnn_array=[];
dispatch(getMultiTrack());
try{
var stringArray=account_number.split(',');
// var uniqueItems = Array.from(new Set(items))
for(var i=0; i<stringArray.length; i++) {
if(account_number!=stringArray[i]){
cnn_array.push({'cnno':stringArray[i]})
// cnn_array.push(Array.from(new Set({'cnno':stringArray[i]})))
}
}
// cnn_array.add({'cnno':account_number})
var formdata=new FormData();
var obj={user:user.toLowerCase(),password:password,detail:cnn_array};
var myJSON =JSON.stringify(obj);
formdata.append("request",myJSON);
let headers = new Headers();
//   headers.append('Content-Type', 'application/json');
//   headers.append('Accept', 'application/json');
//   headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
//   headers.append('Access-Control-Allow-Credentials', 'true');
var requestOptions={
method: 'POST',
body:formdata,
redirect: 'follow'
};
const response=await fetch(TrackingList1,requestOptions);
const data=await response.json(response);
dispatch(getMultiTrackSuccess(data));
}
catch(err){
dispatch(getMultiTrackError(err));    
}
}


export const fetch_MultiTrackSubset2=(account_number,username,password)=>async(dispatch)=>{
try{
dispatch(postMultiTrack());
var formdata = new FormData();
// var obj={acno:Account,usrid:Name,cndetail:[Cnno]};
// var myJSON =JSON.stringify(obj);
// formdata.append("request",myJSON);
var requestOptions={
method:'POST',
headers: new Headers({
    // 'Authorization': 'Basic '+btoa('username:password'), 
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Authorization': 'Basic '+ btoa(username.toLowerCase()+":"+ password), 
    "mode": 'no-cors',
    "Content-Type":'application/json',
    "Accept":'application/json',
    'Authorization':'Basic '+ btoa(username.toLowerCase()+":"+ password), 
    'Origin':'http://localhost:3000', 
  }), 
body:formdata,
redirect:'follow'
};
var stringArray=account_number.split(',');
var acc_number='';
for(var j=0; j<stringArray.length;j++){
acc_number+=`<Number>${stringArray[j]}</Number>`;
}
formdata.append("xml",
`<?xml version="1.0"encoding="utf-8"?>
<BenefitDocument>
<AccessRequest>
<DocumentType>6</DocumentType>
<ShipmentNumbers>
${acc_number}
</ShipmentNumbers>
</AccessRequest>
</BenefitDocument>`);


const response=await fetch(TrackingList3,requestOptions);
const data=await response.json();
// const acc_no=[];
// var stringArray=account_number.split(',');
// for(var i=0; i<stringArray.length; i++) {
// if(account_number!=stringArray[i]){
// acc_no.push({'cnno':stringArray[i]})
// }
// }
// var myJSON=JSON.stringify({'cnno':account_number});
// var formdata = new FormData();
// formdata.append("request",myJSON);
// var requestOptions = {
//   method: 'POST',
//   body: formdata,
// };
// const response =await fetch(TrackingView, requestOptions);
// const data =await response.json();
// console.log('data_comming=>',data);
dispatch(postMultiTrackSuccess(data));
}
catch(err){
dispatch(postMultiTrackError(err));
}
}

export const multiTrackingRecord=(user,password,account_number)=>async(dispatch)=>{
    
    try{
const cnn_array=[];
dispatch(getMultiTrack());
    var stringArray=account_number.split(',');
    console.log('str=',stringArray);
    console.log('acount==',account_number);
    for(var i=0; i<stringArray.length; i++) {
    if(account_number!=stringArray[i]){
    console.log('if block');
    cnn_array.push(stringArray[i]);
    // cnn_array.push(stringArray[i]);
    }
    else{
    cnn_array.push(stringArray[i]);
    }

    console.log('cn_array',cnn_array);
    }


    console.log('array_cn_value=',cnn_array);
    var formdata=new FormData();
    // var obj={user:user.toLowerCase(),password:password,detail:cnn_array};
    var obj={ShipmentNumbers:cnn_array};
    var myJSON =JSON.stringify(obj);
    formdata.append("request",myJSON);
    var requestOptions={
    method: 'POST',   
    body:formdata,
    };
    const response=await fetch(multiTracking,requestOptions);
    console.log('response=>',response);

    const data=await response.json(response);
    console.log('coming_data==>',data);
    
    dispatch(getMultiTrackSuccess(data));
}
catch(err){

    console.log(err);

    dispatch(getMultiTrackError(err));

}
}

export default multitrackSlice;



