import { configureStore } from "@reduxjs/toolkit";
import measurementsReducer from "./modules/measurements";
import logger from 'redux-logger'; 

export const store = configureStore({
  reducer: {
    measurements: measurementsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
