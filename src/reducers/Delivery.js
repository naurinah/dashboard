import {DELIVERIES} from '../actions/types';
const deliveryState={
    deilvery:{},
    deliveries:[]
};

const deliveryReducer=(state=deliveryState,action)=>{
    switch(action.type){
        case DELIVERIES:

        console.log('deliveries');
                return{
                ...state,
                deliveries:action.payload
            }
            default:
            return state;
    }
}
export default deliveryReducer;