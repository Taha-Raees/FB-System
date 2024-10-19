// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import staffReducer from '../slices/staffSlice';
import taskReducer from '../slices/taskSlice'; 
import sidebarReducer from '../slices/sidebarSlice';

export const store = configureStore({
  reducer: {
    staff: staffReducer,
    tasks: taskReducer,
    sidebar: sidebarReducer
  }
});
