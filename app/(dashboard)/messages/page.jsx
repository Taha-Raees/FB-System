"use client";
import dynamic from 'next/dynamic';
import React from 'react';
import Loading from '@/Components/ui/Loading/Loading';

// Dynamically import MessagingApp component with a loading spinner fallback
const MessagingApp = dynamic(() => import('@/Components/DashboardItem/Messages/MessagingApp'), {
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Loading/>
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
