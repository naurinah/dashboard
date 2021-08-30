import {DELIVERIES} from './types';
import {deliveriesApi} from '../apis/apiUrl'
export const fetchDeliveries=(postData)=>dispatch=>{
var formdata = new FormData();
formdata.append("startdate", "2020/08/10");
formdata.append("enddate", "2020/08/13");
formdata.append("status", "All");
formdata.append("acno", "KHI-00114");
formdata.append("startlimit", "");
formdata.append("endlimit", "");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};


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
    
    fetch(deliveriesApi,
    //     {
    //     method:'POST',
    //     body:requestOptions
    // }
    postData
    )
    .then(res=>res.json())
    .then(res2=>{
        dispatch({
            type:DELIVERIES,
            payload:res2
        })
    })
}
export const handleExportFile=()=>{
console.log('export file.....');
}

export const handlecopy=()=>{
console.log('handle copy..');
}