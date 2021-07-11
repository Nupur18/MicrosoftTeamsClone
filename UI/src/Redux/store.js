import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice';
import meetReducer from './slice/meetSlice';
export default configureStore({
  reducer: {
      auth:authReducer,
      meet:meetReducer
  },
})