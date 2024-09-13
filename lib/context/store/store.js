// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import staffReducer from './staffSlice';
import taskReducer from './taskSlice'; 

export const store = configureStore({
  reducer: {
    staff: staffReducer,
    tasks: taskReducer
  }
});
