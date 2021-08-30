import {createSlice} from '@reduxjs/toolkit';
import {check_pickup_status} from '../apis/apiUrl';
import swal from 'sweetalert';

const initialState={
status:[],
status_error:false,
cn_status:[],
selected_Cn:[],
post_cn:[],
status_loader:false,
counter:0,
error:false
}


const statusSlice=createSlice({
    name:'checkstatus',
    initialState,
    reducers:{
        check_status:(state,action)=>{
            state.status=action.payload;
            // state.cn_status=[action.payload];
            // data: [...state.data, ...action.payload.data]
            // state.cn_status=[...state.cn_status];
        },
        status_error:(state,action)=>{
            state.status_error=true;
        },
        append_status:(state,action)=>{
            var flag=true;
            const uniqueArray=state.cn_status.filter((val,id,array) => array.indexOf(val) == id);
            // if(uniqueArray){
                // state.cn_status=[...state.cn_status,{sno:state.counter,cnno:action.payload}];
                // state.error=false;
            // }

            // else{
            //     state.error=true;
           
            // }

            if(flag==true){
            state.cn_status=[...state.cn_status,{sno:state.counter,cnno:action.payload}];
            state.counter++;
            flag=false;
            }
            // let uniquearray=state.cn_status.filter(item =>state.cn_status.includes(item))
            //  let findDuplicates =state.cn_status=>state.cn_status.filter((item, index) => state.cn_status.indexOf(item) != index)
        },
        reset_status:(state,action)=>{
            state.cn_status=[]; 
            state.counter=0;
        },
        delete_single_status:(state,action)=>{
            state.cn_status=state.cn_status.filter(ele=>ele.cnno!=action.payload);
            state.counter--;
        },

        multiple_cn_array:(state,action)=>{
            state.post_cn=action.payload;
        }
    }
})

export const {check_status,status_error,append_status,reset_status,delete_single_status,multiple_cn_array}=statusSlice.actions;
export const statusSelector=state=>state.checkstatus;
export const reducer=statusSlice.reducer;


export const check_status_of_Cn=(cnno,count)=>async(dispatch)=>{
console.log('cnno=>',cnno);
try{
var formdata = new FormData();
var obj={
    cnno:cnno
};
var myJSON=JSON.stringify(obj);
formdata.append("request",myJSON);

var requestOptions={
    method: 'POST',
    body:formdata,
};

const status= await fetch(check_pickup_status,requestOptions);
const status_json=await status.json();
dispatch(check_status(status_json));
if(status_json.last_status==='1'){
dispatch(append_status(cnno));
}
}
catch(err){
dispatch(status_error(err))
}

}
export const empty_status_array=()=>dispatch=>{
    dispatch(reset_status())
}
export const delete_status=(id)=>(dispatch)=>{
    dispatch(delete_single_status(id));
}


export const create_multiple_pickup=(selected_array)=>(dispatch)=>{
    try{
var multiple_array=[];
selected_array.map(ele=>{
    multiple_array=[...multiple_array,ele.data[1]]
  });
// dispatch(multiple_cn_array(selected_array));
// dispatch(multiple_cn_array(selected_array));
    }
catch(err){
console.log(err);
    }

}
export default statusSlice;