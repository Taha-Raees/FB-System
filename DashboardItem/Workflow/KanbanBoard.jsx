import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Column from './KanbanComp/Column/Column'; // You will need to create this component
import './KanbanBoard.scss'

// Main Kanban Board component with state management for columns and tasks
const KanbanBoard = () => {
    const [columns, setColumns] = useState([
        { id: 'column-1', title: 'Pending', tasks: [] },
        // ... more columns
      ]);
    
      const addNewColumn = () => {
        const newColumnId = `column-${columns.length + 1}`;
        const newColumn = {
          id: newColumnId,
          title: 'New Column',
          tasks: [],
        };
        setColumns([...columns, newColumn]);
      };
    
      return (
        <Box className="main-content">
          <Box className="board-title-dropdown">
            <Typography variant="h5">New Installation</Typography>
            {/* Dropdown component goes here */}
          </Box>
          <Box className="column-container">
            {columns.map((column) => (
              <Column key={column.id} {...column} />
            ))}
          </Box>
          <Button className="add-column-button" onClick={addNewColumn}>
            + Add Column
          </Button>
        </Box>
      );
    };

export default KanbanBoard;
