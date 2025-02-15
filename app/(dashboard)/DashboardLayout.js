"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from '../../lib/context/store/store';
import Sidebar from '@/Components/layout/Sidebar/Sidebar';
import Navbar from '@/Components/layout/Navbar/Navbar';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import Loading from '@/Components/ui/Loading2/Loading2';
import ChatBox from '@/Components/layout/ChatBot/ChatBox';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [router]);

  if (loading) {
    return <Loading/>;
  }

  return (
    <Provider store={store}>
      <div className='container'>
        <Sidebar />
        <div className='content'>
          <Navbar />
          <div className='child'>{children}</div>
        </div>
      </div>
      <Analytics />
      <SpeedInsights />
      <ChatBox />
    </Provider>
  );
};

export default DashboardLayout;
