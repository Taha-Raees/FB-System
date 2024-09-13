"use client";
import dynamic from 'next/dynamic';
import { CircularProgress } from '@mui/material';
import React from 'react';

// Dynamically import KanbanBoard with a loading spinner as fallback
const KanbanBoard = dynamic(() => import('@/Components/DashboardItem/Workflow/KanbanBoard'), {
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  ),
});

const KanbanBoardPage = () => {
  return (
    <div>
      <KanbanBoard />
    </div>
  );
};

export default KanbanBoardPage;
