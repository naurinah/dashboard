import { combineReducers } from '@reduxjs/toolkit';
import { reducer as calendarReducer } from 'src/slices/calendar';
import { reducer as chatReducer } from 'src/slices/chat';
import { reducer as formReducer } from 'redux-form';
import { reducer as kanbanReducer } from 'src/slices/kanban';
import { reducer as mailReducer } from 'src/slices/mail';
import { reducer as notificationReducer} from 'src/slices/notification';
import {reducer as DashBoardReducer} from 'src/slices/dashboard';
import {reducer as DeliveriesReducer} from 'src/slices/deliveries';
import {reducer as MultitrackReducer} from 'src/slices/multitrack';
import {reducer as PickupReducer} from 'src/slices/pickup';
import {reducer as ReturnRequestReducer} from 'src/slices/return';
import {reducer as DropdownReducer} from 'src/slices/dropdown';
import {reducer as BookingReducer} from 'src/slices/booking';
import {reducer as calculateFareReducer} from 'src/slices/booking';
import {reducer as checkStatusReducer} from 'src/slices/cnstatus';




const rootReducer=combineReducers({
  calendar:calendarReducer,
  chat:chatReducer,
  form:formReducer,
  kanban:kanbanReducer,
  mail:mailReducer,
  notifications:notificationReducer,
  dashboard:DashBoardReducer,
  deliveries:DeliveriesReducer,
  multitrack:MultitrackReducer,
  pickups:PickupReducer,
  return:ReturnRequestReducer,
  dropdown:DropdownReducer,
  booking:BookingReducer,
  Fare:calculateFareReducer,
  checkstatus:checkStatusReducer
});

export default rootReducer;