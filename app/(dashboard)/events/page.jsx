"use client";
import dynamic from 'next/dynamic';
import { CircularProgress } from '@mui/material';
import React from 'react';

// Dynamically import the Events component with a fallback to show a loading spinner
const Events = dynamic(() => import('@/Components/DashboardItem/Events/Events'), {
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  ),
});

const EventsPage = () => {
  return (
    <div>
      <Events />
    </div>
  );
};

export default EventsPage;
