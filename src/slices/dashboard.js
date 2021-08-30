import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDays} from 'date-fns';
import {AccountSummary,ShippmentTrend,SettlementHistory, deliveriesApi, TrackingView,Statements} from '../apis/apiUrl'
const user=JSON.parse(localStorage.getItem('user_detail'));
const initialState = {
  user_account:'',
  user_name:'',
  user_type:'',
  SummaryDate: [
    {
      startDate:addDays(new Date(),-4),
      endDate:new Date(),
      key: 'selection'
    }],
  summaryLoading:false,
  summaryError:false,
  summaryData:[],
  ShipmentDate:[
    {
      startDate:addDays(new Date(),-3),
      endDate:new Date(),
      key: 'selection'
    }],
  shipmentLoading:false,
  shipmentError:false,
  shipmentData: [],
  a: [],
  y: [],
  account_number:'KHI-04618',
  //settlement_History
  settlementHistory:[],
  settlementLoading:'',
  settlementError:'',
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  Deliveries:[],
  deliveriesLoding: false,
  deliveriesError: false,
  trackingLoading: false,
  trackingError: false,
  trackingData:[],
  settlement:[],
  settlementError:false,
  settlementLoading:false,
  statements:[],
  statementsError:false,
  statementsLoading:false
}
// { 
//   method: 'POST',
//   mode: "cors", // or without this line
//   redirect: 'follow',
//   headers: {
//       'content-type': 'application/json'
//   }
// } 

// First, create the thunk
export const fetchSettlementHistory=createAsyncThunk(
  'dashboard',
  async (account_number=null) => {
    let queryString = new URLSearchParams();
    queryString.append('acno',account_number);
    const response = await fetch(`${SettlementHistory}${queryString}`)
    const data = await response.json();
    return data;

  }
)
// First, create the thunk
export const fetchDeliveries=createAsyncThunk(
  'dashboard/deliveries',
  async(startDate,endDate,acc_no)=>{
    var initialdate = new Date(startDate);
    var finaldate = new Date(endDate);
    // en-US
    // en-US
    // en-US
    //fr-CA
    var date1result = initialdate.toLocaleDateString("zh-Hans-CN",{ // you can skip the first argument
      day: "2-digit",
      year: "numeric",
      month: "2-digit",
    });

    var date2result =finaldate.toLocaleDateString("zh-Hans-CN",{ // you can skip the first argument
      day: "2-digit",
      year: "numeric",
      month: "2-digit",
    });

    var formdata = new FormData();
    var obj = {startdate:date1result,enddate:date2result,status:"All",acno:initialState.account_number,startlimit:"",endlimit:""};
    // var obj = {startdate: date1result, enddate:date2result, acno: "KHI-04618" };
   
    var myJSON=JSON.stringify(obj);
    formdata.append("request",myJSON);
    var requestOptions={
      method: 'POST',
      body: formdata,
    };

    const response = await fetch(deliveriesApi,requestOptions);
    const data =await response.json();
    return data;
  }
)
export const viewTracking = createAsyncThunk(
  'dashboard/tracking',
  async (consignment_no) => {
    var myJSON = JSON.stringify({'cnno':consignment_no});
    var formdata = new FormData();
    formdata.append("request", myJSON);
    var requestOptions = {
      method: 'POST',
      body: formdata,
    };
    const tracking = await fetch(TrackingView, requestOptions);
    const data = await tracking.json();
    return data;
  }
)
const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers:{
    saveUser:(state,action)=>{
      // state.user_account=action.payload.acno;
      // state.user_name=action.payload.name;
      // state.user_type=action.payload.type;
    },

    // getSummary: (state) => {
    //   state.summaryLoading = true
    // },
    // getSummarySucces: (state, action) => {
    //   state.summaryLoading = false;
    //   state.summaryError = false;
    //   state.summaryData = action.payload
    // },
    // getSummaryError: (state) => {
    //   state.summaryError = true
    // },

    /////bbbbb
    getSummary: (state,action) => {
      state.summaryLoading =action.payload
    },
    getSummarySucces: (state, action) => {
      state.summaryLoading = false;
      state.summaryError = false;
      state.summaryData = action.payload
    },
    getSummaryError: (state) => {
      state.summaryError = true
    },
    ////Shipment trend////
    getShipmentTrend: (state,action) => {
      state.shipmentLoading =action.payload
    },

    getShipmentTrendSuccess: (state, action) => {
      state.shipmentLoading=false;
      state.shipmentError=false;
      state.shipmentData=action.payload;
      state.a =action.payload.a;
      state.y =action.payload.y;
      
    },
    getShipmentFailure: (state, action) => {
      state.shipmentError=true;
     
    },
    getDilevery: (state,action) => {
      state.deliveriesLoding = action.payload
    },
    getDileverySuccess: (state, action) => {
      state.deliveriesLoding = false;
      state.deliveriesError = false;
      state.Deliveries = action.payload
    },
    getDileveryError: (state) => {
      state.deliveriesError = true
    },

    //Settlement Logics

    getSettlement:(state)=>{
    state.settlementLoading=true;
    },

    getSettlementSuccess:(state,action)=>{
      state.settlementLoading=false;
      state.settlementError=false;
      state.settlement=action.payload
    },
    getSettlementError:(state,action)=>{
      state.settlementError=true;
      state.settlement=action.payload;
    },
    getStatements:(state)=>{
      state.statementsLoading=true;
    },

    getStatementSuccess:(state,action)=>{
      state.statementsLoading=false;
      state.statementsError=false;
      state.statements=action.payload.detail;
    },

    getStatementError:(state,action)=>{
      state.statementsLoading=false;
      state.statements=action.payload;
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchSettlementHistory.pending]: (state) => {
      // Add user to the state array
      state.settlementLoading = true;
    },
    [fetchSettlementHistory.fulfilled]: (state, action) => {
      // Add user to the state array
      state.settlementLoading = false;
      state.settlementError = false;
      state.settlementHistory = action.payload.detail;
    },

    [fetchSettlementHistory.rejected]: (state, action) => {
      // Add user to the state array
      state.settlementError = true;
      state.settlementHistory = action.payload;
    },
    //Deliveries
    [fetchDeliveries.pending]: (state) => {
      // Add user to the state array
      // state.deliveriesLoding = true;
    },
    [fetchDeliveries.fulfilled]: (state, action) => {
      // Add user to the state array
      state.deliveriesLoding = false;
      state.deliveriesError = false;
      state.Deliveries = action.payload;
    },
    [fetchDeliveries.rejected]: (state, action) => {
      // Add user to the state array
      state.deliveriesError = true;
      state.Deliveries = action.payload;
    },
    //Tracking Info
    [viewTracking.pending]: (state) => {
      // Add user to the state array
      state.trackingLoading = true;
    },
    [viewTracking.fulfilled]: (state, action) => {
      // Add user to the state array
      state.trackingLoading = false;
      state.trackingError = false;
      state.trackingData = action.payload;
    },
    [viewTracking.rejected]: (state, action) => {
      // Add user to the state array
      state.trackingError = true;
      state.trackingData = action.payload;
    }
  },
})
//action creater from createSlice
//summary
export const {
  getSummary, getSummaryError, getSummarySucces, summaryOpener,
  getShipmentTrend, getShipmentTrendSuccess, getShipmentFailure,saveUser,getDilevery,
  getDileverySuccess,getDileveryError,getStatements,getStatementSuccess,getStatementError
} = slice.actions;



//selector
export const dashboardSelector = state => state.dashboard;
//reducer
export const reducer = slice.reducer;
export const saveUserDetail=(user)=> async(dispatch)=>{
dispatch(saveUser(user))
}

//thunk creation
export const fetchDashboardSummary=(startDate=initialState.SummaryDate[0].startDate,endDate=initialState.SummaryDate[0].endDate,account_number=null,loading=false)=> async (dispatch)=>{
  dispatch(getSummary(loading));
  try {
    var initialdate = new Date(startDate);
    var finaldate = new Date(endDate);
    // en-US
    // en-US
    // en-US
    //fr-CA
    var date1result = initialdate.toLocaleDateString("zh-Hans-CN",{ // you can skip the first argument
      day: "2-digit",
      year: "numeric",
      month: "2-digit",
    });
    var date2result = finaldate.toLocaleDateString("zh-Hans-CN", { // you can skip the first argument
      day: "2-digit",
      year: "numeric",
      month: "2-digit",
    });


    var formdata = new FormData();
    // var obj ={startdate:"2020/08/01",enddate:"2020/08/10",acno:"KHI-04618"};
    var obj = { startdate: date1result,enddate:date2result,acno:account_number};
    var myJSON = JSON.stringify(obj);
    formdata.append("request", myJSON);
    var requestOptions = {
      method: 'POST',
      body: formdata,
    };

    const summary = await fetch(AccountSummary,requestOptions);
    const data = await summary.json();
    dispatch(getSummarySucces(data))
  }
  catch (err) {
    dispatch(getSummaryError())
  }
}


export const fetchDeliveriesCustom=(startDate,endDate,account_number=null,loading=false) => async (dispatch) => {

  dispatch(getDilevery(loading));
    try {
      var initialdate = new Date(startDate);
      var finaldate = new Date(endDate);
  
      // en-US
      // en-US
      // en-US
      //fr-CA
      var date1result = initialdate.toLocaleDateString("zh-Hans-CN",{ // you can skip the first argument
        day: "2-digit",
        year: "numeric",
        month: "2-digit",
      });
  
      var date2result =finaldate.toLocaleDateString("zh-Hans-CN",{ // you can skip the first argument
        day: "2-digit",
        year: "numeric",
        month: "2-digit",
      });
  
      var formdata = new FormData();
      var obj = {startdate:date1result,enddate:date2result,status:"All",acno:account_number,startlimit:"",endlimit:""};
      // var obj = {startdate: date1result, enddate:date2result, acno: "KHI-04618" };
     
      var myJSON=JSON.stringify(obj);
      formdata.append("request",myJSON);
      var requestOptions={
        method: 'POST',
        body: formdata,
      };
      const response = await fetch(deliveriesApi,requestOptions);
      const data =await response.json(); 

      
      dispatch(getDileverySuccess(data))
    }
    catch (err) {

      console.log('Comming_Error=',err);
      dispatch(getDileveryError())
    }
  }
  
//*****************Shipment Trend******************///
export const fetchShippementTrend=(startDate=initialState.ShipmentDate[0].startDate,endDate=initialState.ShipmentDate[0].endDate,account_number=null,loading=false) => async(dispatch) => {
  console.log('ship_date=>',initialState.ShipmentDate[0].startDate);
  console.log('ship_date=>',initialState.ShipmentDate[0].endDate);
  dispatch(getShipmentTrend(loading));
  try {
    var initialdate = new Date(startDate);
    var finaldate = new Date(endDate);
    // en-US
    // en-US
    // en-US
    //fr-CA
    var date1result=initialdate.toLocaleDateString("zh-Hans-CN", { // you can skip the first argument
      day: "2-digit",
      year: "numeric",
      month: "2-digit",

    });
    var date2result=finaldate.toLocaleDateString("zh-Hans-CN", { // you can skip the first argument
      day: "2-digit",
      year: "numeric",
      month: "2-digit",
    });
    console.log('date1result1==>',date1result);
    console.log('date2result1==>',date2result);
  
    var formdata = new FormData();
    // var obj ={startdate:"2020/08/01",enddate:"2020/08/10",acno:"KHI-04618"};
    var obj = {startdate:date1result,enddate:date2result,acno:account_number};
    var myJSON =JSON.stringify(obj);
    formdata.append("request", myJSON);
    var requestOptions={
      method: 'POST',
      body: formdata,
    };
    const shipmentTrend = await fetch(ShippmentTrend,requestOptions);
    const shipdata = await shipmentTrend.json();
    
    dispatch(getShipmentTrendSuccess(shipdata))
  }
  catch (err) { 
  dispatch(getShipmentFailure(err))
  }
}



// ***********************Fetch_StatementList*****************************
export const fetch_statementList=(startDate,endDate,account_number)=>async(dispatch)=>{
dispatch(getStatements());
try{
  var initialdate=new Date(startDate);
  var finaldate=new Date(endDate);
    // en-US
    // en-US
    // en-US
    //fr-CA
    // var date1result = initialdate.toISOString().split('T')[0];
    // var date2result = finaldate.toISOString().split('T')[0];
    
    var date1result=initialdate.toLocaleDateString("en-GB",{ // you can skip the first argument
      day:"2-digit",
      year:"numeric",
      month:"2-digit",
    });

    var date2result=finaldate.toLocaleDateString("en-GB",{ // you can skip the first argument
      day:"2-digit",
      year:"numeric",
      month:"2-digit",
    });
    let queryString =new URLSearchParams();
    queryString.append('acno',account_number);
    queryString.append('startDate',date1result);
    
    queryString.append('endDate',date2result);
    const fetchStatements=await fetch(`${SettlementHistory}${queryString}`);
    // const fetchStatements=await fetch(`http://portal.blue-ex.com/api1/customerportal/beta/dashboard.py?acno=${account_number}&start_date=${date1result}&end_date=${date2result}`);
    const statementData=await fetchStatements.json();
    console.log('statementData=>',statementData);
    dispatch(getStatementSuccess(statementData));
}
catch(err){
dispatch(getStatementError(err));

}
}
export default slice;