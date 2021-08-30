import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {Cities,calculateTarrif} from '../apis/apiUrl';
const initialState={
    cities:[],
    cities_error:false,
    calculateFare:[],
    calculateFare_errors:false
}
const dropDownSlice=createSlice({
    name:'dropdown',
    initialState,
    reducers:{
        get_cities_dropdown:(state,action)=>{
            state.cities=action.payload;
        },
        get_cities_error:(state,action)=>{
            state.cities_err=true;
        },
        get_calculateFare:(state,action)=>{
            state.calculateFare=action.payload;
        },
        calculateFare_error:(state,action)=>{
            state.calculateFare_errors=action.payload
        }
    }
})

export const {get_cities_dropdown,get_cities_error,get_calculateFare,calculateFare_error}=dropDownSlice.actions;
export const dropdownSelector=state=>state.dropdown;
export const reducer=dropDownSlice.reducer;
export const fetch_cities_Dropdown=(countryCode)=>async(dispatch)=>{    
    try{
        let queryString =new URLSearchParams();
        queryString.append('country_code','PK');
        const cities=await fetch(`${Cities}${queryString}`);
        const citiesData=await cities.json();
      
        dispatch(get_cities_dropdown(citiesData));
    }
    catch(err){
      
        dispatch(get_cities_error(err));
    }
}
export const CalculateFare=(acno,service_code,cbc_weight,origin_city,destination_city,destination_country,cod_amount)=>async(dispatch)=>{
    try{
        var formdata = new FormData();
        formdata.append("acno",acno);
        formdata.append("origin",origin_city);
        formdata.append("destination",destination_city);
        // formdata.append("origin",'KHI');
        // formdata.append("destination",'LHE');
        // formdata.append("service",service_code);
        formdata.append("wgt",cbc_weight);
        formdata.append("cod_amount",cod_amount);

var obj={acno:acno,origin:origin_city,destination:destination_city,service:service_code,wgt:cbc_weight.toString(),cod_amount:cod_amount.toString()};
console.log(acno,"-",origin_city,"-",destination_city,"-",service_code,"-",cbc_weight,"-",cod_amount);
var myJSON =JSON.stringify(obj);
formdata.append("request",myJSON);
        var requestOptions={
            method:'POST',
            body:formdata,
        };
        const response=await fetch(calculateTarrif,requestOptions)
        const data=await response.json(response);
dispatch(get_calculateFare(data));
    }
    catch(err){
dispatch(calculateFare_error(err))
    }
}
export default dropDownSlice;