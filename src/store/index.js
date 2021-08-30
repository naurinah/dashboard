import { 
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import {ENABLE_REDUX_DEV_TOOLS } from 'src/constants';
import rootReducer from './rootReducer';


const store=configureStore({
  reducer:rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}).concat(logger),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({immutableCheck: false,serializableCheck: false}),
  devTools: ENABLE_REDUX_DEV_TOOLS
});
export const useSelector=useReduxSelector;
export const useDispatch=() =>useReduxDispatch();
export default store;
