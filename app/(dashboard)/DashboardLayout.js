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


const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State to manage loading indicator

  useEffect(() => {
    const isSignedIn = localStorage.getItem('isSignedIn');
    if (isSignedIn !== 'true') {
      router.push('/getstarted'); // Redirect to get started page if not signed in
    } else {
      setLoading(false); // Hide loading once the check is complete and user is signed in
    }
  }, [router]);

  if (loading) {
    return <Loading/>; // Show loading screen while checking the sign-in status
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
    </Provider>
  );
};

export default DashboardLayout;
