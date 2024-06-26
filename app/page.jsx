"use client";
import React, { useState, useEffect } from 'react';
import GetStarted from '@/Components/GetStarted/GetStarted';
import Dashboard from '@/Components/Dashboard/Dashboard';
import { scheduleClockUpdate } from '@/Components/Clock/clock';
import './Main.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-popup/style.css';
import Loading from '@/Components/Loading/Loading';

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(null); // Start with null to indicate loading state
  const [loading, setLoading] = useState(true); // State to manage the loading screen.

  useEffect(() => {
    scheduleClockUpdate();
  }, []);

  useEffect(() => {
    // Immediately check and set sign-in status from localStorage
    const signedIn = localStorage.getItem("isSignedIn") === "true";
    setIsSignedIn(signedIn);
  }, []);

  useEffect(() => {
    // Ensure the loading screen is displayed for at least 5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  // Handle the sign-in process
  const handleSignIn = () => {
    setIsSignedIn(true);
    localStorage.setItem("isSignedIn", "true");
  };

  // Handle the sign-out process
  const handleSignOut = () => {
    setIsSignedIn(false);
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("dashboardState"); // Assuming you reset the dashboard state
  };

  // Show loading or a blank state until `isSignedIn` is determined
  if (loading || isSignedIn === null) {
    return <Loading />; // Show the loading screen
  }

  return (
    <div className="main">
      {isSignedIn ? (
        <Dashboard onSignOut={handleSignOut} />
      ) : (
        <GetStarted onSignIn={handleSignIn} />
      )}
    </div>
  );
};

export default Home;
