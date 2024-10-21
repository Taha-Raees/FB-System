"use client";
import dynamic from 'next/dynamic';
import React from 'react';
import Loading from '@/Components/ui/Loading/Loading';

// Dynamically import the Events component with a fallback to show a loading spinner
const Events = dynamic(() => import('@/Components/DashboardItem/Events/Events'), {
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Loading/>
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
