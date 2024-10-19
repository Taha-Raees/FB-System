"use client";
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import './TaskAssignments.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, editTask, deleteTask } from '@/lib/context/slices/taskSlice'; // Update path

const TaskAssignments = () => {
  const dispatch = useDispatch();
  const staffMembers = useSelector((state) => state.staff.staffMembers);
  const tasks = useSelector((state) => state.tasks.tasks);

  const [searchQuery, setSearchQuery] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleAddTask = () => {
    setEditingTask({ id: null, name: '', date: '', startTime: '', endTime: '', assignedTo: '' });
    setErrors({});
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setErrors({});
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleModalClose = () => {
    setIsTaskModalOpen(false);
    setEditingTask({ id: null, name: '', date: '', startTime: '', endTime: '', assignedTo: '' });
    setErrors({});
  };

  const handleSaveTask = () => {
    const newErrors = {};
    if (!editingTask.name) newErrors.name = 'Task is required';
    if (!editingTask.date) newErrors.date = 'Date is required';
    if (!editingTask.startTime) newErrors.startTime = 'Start Time is required';
    if (!editingTask.endTime) newErrors.endTime = 'End Time is required';
    if (!editingTask.assignedTo) newErrors.assignedTo = 'Assign To is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingTask.id) {
      dispatch(editTask(editingTask));
    } else {
      const newTask = { ...editingTask, id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1 };
      dispatch(addTask(newTask));
    }
    handleModalClose();
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery) ||
    task.date.toLowerCase().includes(searchQuery) ||
    staffMembers.find(member => member.id === task.assignedTo)?.name.toLowerCase().includes(searchQuery)
  );


  return (
    <div className="task-assignments-page">
      
      <Typography variant="h4" component="h1" className="title">
        Task Assignments
      </Typography>
      <div className="controls">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
      <TableContainer component={Paper} className="tasks-table-container">
        <Table>
          <TableHead sx={{ backgroundColor: 'rgba(25, 118, 210, 1)' }}>
            <TableRow>
              <TableCell sx={{ color: '#FFFFFF' }}>Task</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Date</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Start Time</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>End Time</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Assigned To</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.date}</TableCell>
                <TableCell>{task.startTime}</TableCell>
                <TableCell>{task.endTime}</TableCell>
                <TableCell>{staffMembers.find(member => member.id === task.assignedTo)?.name || 'Unassigned'}</TableCell>
                <TableCell>
                  <IconButton  aria-label="edit" onClick={() => handleEditTask(task)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isTaskModalOpen} onClose={handleModalClose}>
        <DialogTitle>{editingTask?.id ? 'Edit Task' : 'Add Task'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Task"
            fullWidth
            value={editingTask?.name || ''}
            onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editingTask?.date || ''}
            onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })}
            error={!!errors.date}
            helperText={errors.date}
          />
          <TextField
            margin="dense"
            label="Start Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editingTask?.startTime || ''}
            onChange={(e) => setEditingTask({ ...editingTask, startTime: e.target.value })}
            error={!!errors.startTime}
            helperText={errors.startTime}
          />
          <TextField
            margin="dense"
            label="End Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editingTask?.endTime || ''}
            onChange={(e) => setEditingTask({ ...editingTask, endTime: e.target.value })}
            error={!!errors.endTime}
            helperText={errors.endTime}
          />
          <TextField
            margin="dense"
            label="Assign To"
            fullWidth
            select
            value={editingTask?.assignedTo || ''}
            onChange={(e) => setEditingTask({ ...editingTask, assignedTo: e.target.value })}
            error={!!errors.assignedTo}
            helperText={errors.assignedTo}
          >
            {staffMembers.map(member => (
              <MenuItem key={member.id} value={member.id}>{member.name}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskAssignments;
