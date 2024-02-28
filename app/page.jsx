"use client"
import React, { useState, useEffect } from 'react';
import GetStarted from '@/Components/GetStarted/GetStarted';
import Dashboard from '@/Components/Dashboard/Dashboard';
import "./Main.scss";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-popup/style.css'; 

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(null); // Start with null to indicate loading state

  useEffect(() => {
    // Immediately check and set sign-in status from localStorage
    const signedIn = localStorage.getItem("isSignedIn") === "true";
    setIsSignedIn(signedIn);
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
  if (isSignedIn === null) {
    return <div>Loading...</div>; // Customize your loading state as needed
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
