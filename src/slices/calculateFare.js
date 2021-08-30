import {createSlice} from '@reduxjs/toolkit';
import {CalculateFare} from '../apis/apiUrl';
const initialState={
    pickup:[],
    pickup_error:false
}
const pickupSlice=createSlice({
    name:'createpickup',
    initialState,
    reducers:{
        submit_pickup:(state,action)=>{
            console.log(action.payload);
            state.pickup=action.payload;
        },
        submit_pickup_error:(state,action)=>{
            state.pickup_error=true;
        }
    }
})


export const {submit_pickup,submit_pickup_error}=pickupSlice.actions;
export const dropdownSelector=state=>state.createpickup;
export const reducer=pickupSlice.reducer;
export const submit_pickup=(countryCode)=>async(dispatch)=>{
    try{
        let queryString =new URLSearchParams();
        queryString.append('country_code','PK');
        const cities=await fetch(`${CalculateFare}${queryString}`);
        const citiesData=await cities.json();
        dispatch(get_cities_dropdown(citiesData));
    }
    catch(err){

        console.log(err);
        dispatch(get_cities_error(err));
    }
}
export default pickupSlice;
