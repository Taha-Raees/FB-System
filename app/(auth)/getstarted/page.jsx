"use client"
import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import "./GetStarted.scss";
import { Android, Window } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const GetStarted = ({  }) => {
  const router = useRouter();
  const handleGetStartedClick = () => {
    router.push('/');
  };
  const routesToPrefetch = [
    '/',
    '/events',
    '/staffing',
    '/inventory',
    '/workflow',
    '/finance',
    '/messages',
  ];

  // Prefetch all routes when the component is mounted
  useEffect(() => {
    routesToPrefetch.forEach((route) => {
      router.prefetch(route);
    });
  }, [router]);
   

  return (
      (
        <div className="GetStarted">
          <div className="container">
            <div className="content">
              <h1 className="title">Welcome to G&G System</h1>
              <p className="subtitle">
                Your all-in-one business management suite: streamline your events, food trucks, inventory, and personnel with ease and precision.
              </p>
              <button onClick={handleGetStartedClick} className="button">
                Get Started.
              </button>
              </div>
            </div>
          </div>
      )
    
  );
};

export default GetStarted;
