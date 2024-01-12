"use client"
import React, { useState } from 'react';
import { NavigationProvider } from '@/ContextApi/NavigationContext'; // Adjust the import path as needed
import GetStarted from '@/Components/GetStarted/GetStarted';
import Dashboard from '@/Components/Dashboard/Dashboard';
import "./Main.scss";

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <NavigationProvider>
      <div className="main">
        {isSignedIn ? (
          <Dashboard onSignOut={handleSignOut} />
        ) : (
          <GetStarted onSignIn={handleSignIn} />
        )}
      </div>
    </NavigationProvider>
  );
};

export default Home;
