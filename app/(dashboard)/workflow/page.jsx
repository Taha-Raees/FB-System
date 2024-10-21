"use client";
import dynamic from 'next/dynamic';
import React from 'react';
import Loading from '@/Components/ui/Loading/Loading';

// Dynamically import KanbanBoard with a loading spinner as fallback
const KanbanBoard = dynamic(() => import('@/Components/DashboardItem/Workflow/KanbanBoard'), {
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Loading />
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
