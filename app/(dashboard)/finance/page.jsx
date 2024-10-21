"use client";
import dynamic from 'next/dynamic';
import React from 'react';
import Loading from '@/Components/ui/Loading/Loading';

// Dynamically import Finance component with a loading spinner fallback
const Finance = dynamic(() => import('@/Components/DashboardItem/Finance/Finance'), {
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Loading />
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
