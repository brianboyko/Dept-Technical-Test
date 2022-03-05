import { configureStore } from '@reduxjs/toolkit';
import measurementsReducer from './modules/measurements';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    measurements: measurementsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware();
    if (process.env.NODE_ENV === 'development') {
      defaultMiddleware.push(logger);
    }
    return defaultMiddleware;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
