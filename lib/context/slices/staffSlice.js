// store/staffSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  staffMembers: [
    { id: 1, name: 'John Doe', position: 'Manager', contact: 'john.doe@example.com', salary: 50, startDate: '2023-01-01', contractEnd: '2025-01-01' },
    { id: 2, name: 'Jane Smith', position: 'Chef', contact: 'jane.smith@example.com', salary: 40, startDate: '2022-06-01', contractEnd: '2024-06-01' }
  ],
  tasks: [
    { id: 1, name: 'Inventory Management', date: '2023-01-01', startTime: '09:00', endTime: '11:00', assignedTo: 1 },
    { id: 2, name: 'Customer Service', date: '2023-01-02', startTime: '11:00', endTime: '13:00', assignedTo: 2 }
  ]
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    addStaffMember: (state, action) => {
      state.staffMembers.push(action.payload);
    },
    editStaffMember: (state, action) => {
      const index = state.staffMembers.findIndex(member => member.id === action.payload.id);
      if (index !== -1) {
        state.staffMembers[index] = action.payload;
      }
    },
    deleteStaffMember: (state, action) => {
      state.staffMembers = state.staffMembers.filter(member => member.id !== action.payload);
    }
  }
});

export const { addStaffMember, editStaffMember, deleteStaffMember } = staffSlice.actions;
export default staffSlice.reducer;
