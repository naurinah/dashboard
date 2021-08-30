import {
    DASHBOARD, DATECHANGE, POPOVERCHANGE, BUTTONCLICK,
    SHIPPMENTTREND, SUMMARYDATE, POPOVERSHIPCHANGE, SHIPBUTTONCLICK, SHIPLOADER,
    FETCHSETTLEMENT,LOADER
} from '../actions/types';
import { addDays } from 'date-fns';

const DashBoardState = {
    dashboardState: {},
    loading:false,
    shiploading: false,
    Month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    DateState: [
        {
            startDate:addDays(new Date(),-15),
            endDate:new Date(),
            key:'selection'
        }
    ],
    SummaryDateState: [
        {
            startDate: addDays(new Date(),-15),
            endDate:new Date(),
            key:'selection'
        }
    ],
    anchorEl: null,
    trendanchorEl: null,
    ShipmentTrend: {
    },
    ydata: [],
    label: [],
    Settlement:[],
};

const DashBoardReducer=(state=DashBoardState, action) => {
   console.log('DashboardState=',DashBoardState);
    switch (action.type) {
        case DASHBOARD:
            return {
                ...state,
                dashboardState: action.payload,
                loading:true
            }
        case DATECHANGE:
            return {
                ...state,
                DateState:action.payload,
            }
        case POPOVERCHANGE:
            return {
                ...state,
                anchorEl:action.payload,
                loading:false
            }
        case BUTTONCLICK:
            return {
                ...state,
                anchorEl: action.payload,
            }

        
        /// SHIPMENT TREND/////
        case SHIPPMENTTREND:
            var object = action.payload.detail;
            var label = [];
            var ydata = [];
            for (const property in object) {
                // console.log(`${property}:seprator:${object[property].y} ${object[property].a}`);
                label.push(object[property].a);
                ydata.push(object[property].y);
            }
            return {
                ...state,
                ShipmentTrend: action.payload,
                label: label,
                ydata: ydata,
                shiploading: true
            }

        case SUMMARYDATE:
            return {
                ...state,
                SummaryDateState: action.payload,
            }

        case POPOVERSHIPCHANGE:
            return {
                ...state,
                trendanchorEl: action.payload,
                shiploading:false
            }
        case SHIPBUTTONCLICK:
            return {
                ...state,
                trendanchorEl: action.payload,
            }
       
        case FETCHSETTLEMENT:
            // var settlement=[];
            // action.payload.detail.forEach((single_settlement) => {
            // settlement.push(single_settlement)
            // })
            return {
                ...state,
                Settlement:action.payload.detail
            }

        default:
            return state;
    }
}
export default DashBoardReducer;