"use client";
import dynamic from 'next/dynamic';
import { CircularProgress } from '@mui/material';
import React from 'react';

// Dynamically import DashboardContent with a loading spinner fallback
const DashboardContent = dynamic(() => import('@/Components/DashboardItem/DashboardContent/DashboardContent'), {
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  ),
});

const DashboardPage = () => {
  return (
    <div>
      <DashboardContent /> {/* This will dynamically load the DashboardContent component */}
    </div>
  );
};

export default DashboardPage;
