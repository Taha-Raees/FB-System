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
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import './TaskAssignments.scss';
import BackButton from '@/Buttons/BackButton/BackButton';

const TaskAssignments = ({ staffMembers, setStaffMembers, onBack }) => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Inventory Management', day: 'Monday', time: '09:00 AM', assignedTo: 1 },
    { id: 2, name: 'Customer Service', day: 'Tuesday', time: '11:00 AM', assignedTo: 2 },
    // Add more tasks as needed
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState({ id: null, name: '', day: '', time: '', assignedTo: '' });

  const handleAddTask = () => {
    setEditingTask({ id: null, name: '', day: '', time: '', assignedTo: '' });
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = () => {
    if (editingTask.id) {
      setTasks(tasks.map(task => (task.id === editingTask.id ? editingTask : task)));
    } else {
      setEditingTask({ ...editingTask, id: tasks.length + 1 });
      setTasks([...tasks, { ...editingTask, id: tasks.length + 1 }]);
    }
    setIsTaskModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery) ||
    task.day.toLowerCase().includes(searchQuery) ||
    staffMembers.find(member => member.id === task.assignedTo)?.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="task-assignments-page">
      <BackButton onBack={onBack} />
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
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.day}</TableCell>
                <TableCell>{task.time}</TableCell>
                <TableCell>{staffMembers.find(member => member.id === task.assignedTo)?.name || 'Unassigned'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditTask(task)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)}>
        <DialogTitle>{editingTask.id ? 'Edit Task' : 'Add Task'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Task"
            fullWidth
            value={editingTask.name}
            onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Day"
            fullWidth
            select
            value={editingTask.day}
            onChange={(e) => setEditingTask({ ...editingTask, day: e.target.value })}
          >
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <MenuItem key={day} value={day}>{day}</MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Time"
            fullWidth
            value={editingTask.time}
            onChange={(e) => setEditingTask({ ...editingTask, time: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Assign To"
            fullWidth
            select
            value={editingTask.assignedTo}
            onChange={(e) => setEditingTask({ ...editingTask, assignedTo: e.target.value })}
          >
            {staffMembers.map(member => (
              <MenuItem key={member.id} value={member.id}>{member.name}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsTaskModalOpen(false)} color="primary">
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
