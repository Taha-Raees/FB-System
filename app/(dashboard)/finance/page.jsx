"use client";
import dynamic from 'next/dynamic';
import { CircularProgress } from '@mui/material';
import React from 'react';

// Dynamically import Finance component with a loading spinner fallback
const Finance = dynamic(() => import('@/Components/DashboardItem/Finance/Finance'), {
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  ),
});

const FinancePage = () => {
  return (
    <div>
      <Finance /> {/* Dynamically loads Finance component */}
    </div>
  );
};

export default FinancePage;
