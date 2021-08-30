import { DASHBOARD, DATECHANGE, POPOVERCHANGE, BUTTONCLICK,
  SHIPPMENTTREND,SUMMARYDATE,POPOVERSHIPCHANGE,SHIPBUTTONCLICK,SHIPLOADER,FETCHSETTLEMENT,LOADER} from './types';
import { AccountSummary, ShippmentTrend, SettlementHistory} from '../apis/apiUrl'


//ACCOUNT SUMMARY///
export const DashBoardSummary=(startDate, endDate,loader) => async (dispatch) => {
  var initialdate = new Date(startDate);
  var finaldate = new Date(endDate);

  // en-US
  // en-US
  // en-US
  //fr-CA
  var date1result = initialdate.toLocaleDateString("zh-Hans-CN", { // you can skip the first argument
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
  var obj = {startdate: date1result, enddate: date2result, acno: "KHI-04618" };
  var myJSON = JSON.stringify(obj);
  formdata.append("request", myJSON);
  var requestOptions = {
    method: 'POST',
    body: formdata,
  };
  

  const fetch_req = await fetch(AccountSummary, requestOptions);
  const response = await fetch_req.json();

  dispatch({
    type: DASHBOARD,
    payload:response
  })


  // dispatch({
  //   type: LOADER,
  //   payload:true
  // })


    
  // fetch(SettlementHistory,requestOptions)
  //   .then(response =>{ 
  //   response.json()})
  //   .then(result => {
  //   console.log('fetch====',result);
  //   dispatch({
  //     type:DASHBOARD,
  //     payload:result
  //   })
  //     })
  //   .catch(error =>{
  //   console.log('error====',error)
  //     });




  // fetch(deliveriesApi,{
  //     method:'POST',
  //     body:requestOptions
  // })
  // .then(res=>res.json())
  // .then(res2=>{
  //     dispatch({
  //         type:DELIVERIES,
  //         payload:res2
  //     })
  // })


  // fetch(deliveriesApi,
  // //     {
  // //     method:'POST',
  // //     body:requestOptions
  // // }
  // postData
  // )
  // .then(res=>res.json())
  // .then(res2=>{
  //     dispatch({
  //         type:DASHBOARD,
  //         payload:res2
  //     })
  // })

}

export const changeDate = (date) => {
  
  return (dispatch) => {
    dispatch({
      type: DATECHANGE,
      payload: date
    })

  }
}

export const SummaryLoader=value=>dispatch=>{
  dispatch({
    type:LOADER,
    payload:value
  })
}
export const handleClose = () => {
  return (dispatch) => {
    dispatch({
      type: POPOVERCHANGE,
      payload: null
    })

  }
}

export const handleClick = (event) => {
  return (dispatch) => {
    dispatch({
      type: BUTTONCLICK,
      payload: event.currentTarget
    })
  }
}

//ACCOUNT SUMMARY END///



//Shippment TREND.......
export const fetchShippemetTrend=(account_number,StartDate,EndDate)=>async(dispatch)=>{
console.log('account-number==',account_number);

var initialdate = new Date(StartDate);
var finaldate = new Date(EndDate);
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


var formdata = new FormData();
var obj={startdate:date1result,enddate:date2result,acno:"KHI-04618"};

// var obj={startdate:"01/08/2020",enddate:"03/08/2020",acno:"KHI-04618"};

var myJSON=JSON.stringify(obj);
formdata.append("request",myJSON);

const requestOptions={
  method:'POST',
  body:formdata
}


const shipTrend= await fetch(ShippmentTrend,requestOptions);
const shipResult= await shipTrend.json();

dispatch({
  type:SHIPPMENTTREND,
  payload:shipResult
})

}


export const changeShiptrendDate=(date)=>dispatch=>{
  dispatch({
    type: SUMMARYDATE,
    payload: date
  })
}

export const shiphandleClose = () => {
  return (dispatch) => {
    dispatch({
      type:POPOVERSHIPCHANGE,
      payload:null
    })

  }
}

export const shiphandleClick = (event) => {
  return (dispatch) => {
    dispatch({
      type:SHIPBUTTONCLICK,
      payload: event.currentTarget
    })
  }
}

//SETTLEMENT//
export const fetchSettlement=account_number=>async(dispatch)=>{   
let queryString = new URLSearchParams()
queryString.append('acno',account_number);
console.log('query-string',queryString);
// const fetchSettlement=await fetch(`${SettlementHistory},${queryString}`);
const fetchSettlement=await fetch(`http://portal.blue-ex.com/api1/customerportal/beta/dashboard.py?${queryString}`)
const fetchResponse=await fetchSettlement.json();
console.log('fetch-settlement',fetchResponse);
dispatch({
    type:FETCHSETTLEMENT,
    payload:fetchResponse
  })
  
}

export const testing=(param1)=>{
  console.log('param1=',param1);
  return (dispatch)=>{
  }
}