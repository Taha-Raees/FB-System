"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/Components/ui/Loading/Loading';
import DashboardContent from '@/Components/DashboardItem/DashboardContent/DashboardContent';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSignIn = () => {
      const isSignedIn = localStorage.getItem('isSignedIn');
      if (isSignedIn !== 'true') {
        router.push('/getstarted'); // Redirect to get started page if not signed in
      }
    };

    checkSignIn();
  }, [router]);

  return <DashboardContent/>; 
};

export default Home;
