// store/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    { id: 1, name: 'Inventory Management', date: '2023-01-01', startTime: '09:00', endTime: '11:00', assignedTo: 1 },
    { id: 2, name: 'Customer Service', date: '2023-01-02', startTime: '11:00', endTime: '13:00', assignedTo: 2 }
  ]
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  }
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
