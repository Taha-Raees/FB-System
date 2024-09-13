"use client";
import dynamic from 'next/dynamic';
import { CircularProgress } from '@mui/material';
import React from 'react';

// Dynamically import MessagingApp component with a loading spinner fallback
const MessagingApp = dynamic(() => import('@/Components/DashboardItem/Messages/MessagingApp'), {
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  ),
});

const MessagingAppPage = () => {
  return (
    <div>
      <MessagingApp /> {/* Dynamically loads MessagingApp component */}
    </div>
  );
};

export default MessagingAppPage;
