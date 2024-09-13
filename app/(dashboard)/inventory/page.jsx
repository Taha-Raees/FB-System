"use client";
import dynamic from 'next/dynamic';
import { CircularProgress } from '@mui/material';
import React from 'react';

// Dynamically import the Inventory component with a loading spinner fallback
const Inventory = dynamic(() => import('@/Components/DashboardItem/Inventory/Inventory'), {
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  ),
});

const InventoryPage = () => {
  return (
    <div>
      <Inventory /> {/* This will dynamically load the Inventory component */}
    </div>
  );
};

export default InventoryPage;
