import React, { useState } from 'react';
import Login from '@/Components/Login/Login';
import "./GetStarted.scss";

const GetStarted = ({ onSignIn }) => {
  const [showLogin, setShowLogin] = useState(false);

  const handleGetStartedClick = () => {
    setShowLogin(true);
  };

  return (
    <>
      {!showLogin ? (
        <div className="container">
          <div className="content">
            <img src="/images/Logo.png" alt="Linear Logo" className="logo" width={300} height={300} />
            <h1 className="title">Welcome to F&B System</h1>
            <p className="subtitle">
              Your all-in-one business management suite: streamline your events, food trucks, inventory, and personnel with ease and precision.
            </p>
            <button onClick={handleGetStartedClick} className="button">
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <Login onSignIn={onSignIn} />
      )}
    </>
  );
};

export default GetStarted;


