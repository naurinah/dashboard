import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {addDays} from 'date-fns';
import {createLoadSheet,voidConsignment,updateProfile} from '../apis/apiUrl'
const BookingState = {
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
const BookingSlice=createSlice({
    name:'Booking',
    BookingState,
    reducers:{
        getBooking:(state)=>{

        },
        getBookingSuccess:(state,action)=>{

        },
        getBookingError:(state)=>{

        }
    }
})

export const BookingSelector=state=>state.Booking;
export const {getBooking,getBookingSuccess,getBookingError}=BookingSlice.actions
export const reducer=BookingSlice.reducer;