import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {addDays} from 'date-fns';
import {ReturnRequest,Approved_Reattempt,Return_Summary} from '../apis/apiUrl'
const initialState = {
    returnRequest:[],
    returnRequestLoading:false,
    returnRequestError:false,
    ReturnRequestDate:[
        {
          startDate:addDays(new Date(),-4),
          endDate:new Date(),
          key: 'selection'
        }],
        SummaryRequestDate:[
            {
              startDate:addDays(new Date(),-4),
              endDate:new Date(),
              key: 'selection'
            }],
    approveRequest:[],
    approveRequestLoading:false,
    approveRequestError:false,

    reattemptRequest:[],
    reattemptRequestLoading:false,
    reattemptRequestError:false,



    returnSummary:[],
    returnSummaryLoading:false,
    returnSummaryError:false

}

const returnRequestSlice=createSlice({
    name:'return',
    initialState,
    reducers:{
        getreturnRequest:(state,action)=>{
            state.returnRequestLoading=action.payload;
        },
        getreturnRequestSuccess:(state,action)=>{
            state.returnRequestLoading=false;
            state.returnRequestError=false;
            state.returnRequest=action.payload;
        },
        getreturnRequestError:(state,action)=>{
            state.returnRequestError=action.payload;
        },

        getsummary:(state)=>{
            state.returnSummaryLoading=true;

        },
        getsummarySuccess:(state,action)=>{
           
            state.returnSummaryLoading=false;
            state.returnSummaryError=false;
            state.returnSummary=action.payload;

        },
        getsummaryError:(state,action)=>{
            state.returnSummaryError=action.payload;
        },

        getapproved:(state)=>{
            state.approveRequestLoading=true;
        },
        getapprovedSuccess:(state,action)=>{
            
            state.approveRequest=action.payload;
            state.approveRequestLoading=false;
            state.approveRequestError=false;
        },
        getapprovedError:(state,action)=>{
            state.approveRequestError=true;
        },
        getReattempt:(state)=>{
            state.reattemptRequestLoading=true;
        },
        getReattemptSuccess:(state,action)=>{
           
            state.reattemptRequest=action.payload;
            state.reattemptRequestLoading=false;
            state.reattemptRequestError=false;
        },
        getReattemptError:(state,action)=>{
            state.reattemptRequestError=true;
        }
        
    }
    })

    export const {
        getreturnRequest,getreturnRequestSuccess,getreturnRequestError,
        getsummary,getsummarySuccess,getsummaryError,
        getapproved,getapprovedSuccess,getapprovedError,
        getReattempt,getReattemptSuccess,getReattemptError
        }=returnRequestSlice.actions;
    
    //selector
    export const returnSelector=state =>state.return;
    //
    export const reducer=returnRequestSlice.reducer;

    export const fetch_returnRequest=(startDate,endDate,acno,loading=false,startlimit='',endlimit='')=> async(dispatch)=>{


        dispatch(getreturnRequest(loading));
        try{
            var initialdate = new Date(startDate);
            var finaldate = new Date(endDate);
            // en-US
            // en-US
            // en-US
            //fr-CA
            var date1result=initialdate.toLocaleDateString("zh-Hans-CN",{ // you can skip the first argument
              day: "2-digit",
              year: "numeric",
              month: "2-digit",
            });
            var date2result=finaldate.toLocaleDateString("zh-Hans-CN", { // you can skip the first argument
              day: "2-digit",
              year: "numeric",
              month: "2-digit",
            });
            var formdata = new FormData();
            // // var obj ={startdate:"2020/08/01",enddate:"2020/08/10",acno:"KHI-04618"};
            var obj = {acno:acno,startdate:date1result,enddate:date2result,startlimit:"",endlimit:""};
            var myJSON =JSON.stringify(obj);
            formdata.append("request", myJSON);
            var requestOptions={
              method: 'POST',
              body: formdata,
            };
            const return_fetch= await fetch(ReturnRequest,requestOptions);
            const return_data = await return_fetch.json();
            dispatch(getreturnRequestSuccess(return_data))
        }
        catch(err){
          
            dispatch(getsummaryError(err))
        }
    }

export const fetch_approvedRequest=(acno,status)=>async(dispatch)=>{
    dispatch(getapproved())
try{
            var formdata = new FormData();
            var obj = {acno:acno,status:status};
            var myJSON =JSON.stringify(obj);
            formdata.append("request", myJSON);
            var requestOptions={
              method: 'POST',
              body: formdata,
            };
            const approve_fetch= await fetch(Approved_Reattempt,requestOptions);
            const approve_data = await approve_fetch.json();
            dispatch(getapprovedSuccess(approve_data))
    

}
catch(err){

dispatch(getapprovedError(err))
}
}
export const fetch_reAttemptRequest=(acno,status)=>async(dispatch)=>{
    dispatch(getReattempt())
    try{
                var formdata = new FormData();
                var obj = {acno:acno,status:status};
                var myJSON =JSON.stringify(obj);
                formdata.append("request", myJSON);
                var requestOptions={
                  method: 'POST',
                  body: formdata,
                };
                const approve_fetch= await fetch(Approved_Reattempt,requestOptions);
                const approve_data = await approve_fetch.json();
                dispatch(getReattemptSuccess(approve_data))
    }
    catch(err){
    dispatch(getReattemptError(err))
    }
}

export const fetch_returnSummary=(startDate,endDate,acno)=>async (dispatch)=>{

    dispatch(getsummary());
try{

var initialdate = new Date(startDate);
            var finaldate = new Date(endDate);
            // en-US
            // en-US
            // en-US
            //fr-CA
            var date1result=initialdate.toLocaleDateString("zh-Hans-CN",{ // you can skip the first argument
              day: "2-digit",
              year: "numeric",
              month: "2-digit",
            });
            var date2result=finaldate.toLocaleDateString("zh-Hans-CN", { // you can skip the first argument
              day: "2-digit",
              year: "numeric",
              month: "2-digit",
            });
            
            var formdata = new FormData();
            // // var obj ={startdate:"2020/08/01",enddate:"2020/08/10",acno:"KHI-04618"};
            var obj = {acno:acno,startdate:date1result,enddate:date2result};
            var myJSON =JSON.stringify(obj);
            formdata.append("request", myJSON);
            var requestOptions={
              method: 'POST',
              body: formdata,
            };
const summaryRequest = await fetch(Return_Summary,requestOptions);
const summaryData = await summaryRequest.json();
dispatch(getsummarySuccess(summaryData))
}
catch(err){

dispatch(getsummaryError(err))
}
}
export default  returnRequestSlice;
