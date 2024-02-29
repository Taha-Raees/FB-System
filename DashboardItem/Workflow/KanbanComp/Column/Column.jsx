import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import TaskCard from '@/DashboardItem/Workflow/KanbanComp/TaskCard/TaskCard'; // TaskCard component is assumed to be created separately.
import './Column.scss';

const Column = ({ title, tasks, onAddTask }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: 300, // assuming a fixed width for each column
        minHeight: 500,
        margin: '0 16px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#EBECF0' // color based on the image provided
      }}
    >
      <Typography variant="h6" sx={{ p: 2, color: '#172B4D' }}>
        {title}
      </Typography>
      <div className="task-list">
        {tasks.map(task => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
      <Button
        variant="text"
        onClick={onAddTask}
        sx={{ mt: 'auto', mb: 2, color: '#5E6C84' }}
      >
        + Add another card
      </Button>
    </Paper>
  );
};

export default Column;
