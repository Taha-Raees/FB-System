import React, { useState } from 'react';
import Login from '@/Components/Login/Login';
import Button from '@mui/material/Button';
import "./GetStarted.scss";
import { Android, Window } from '@mui/icons-material';

const GetStarted = ({ onSignIn }) => {
  const [showLogin, setShowLogin] = useState(false);

  const handleGetStartedClick = () => {
    setShowLogin(true);
  };

  return (
    <>
      {!showLogin ? (
        <div className="GetStarted">
          <div className="container">
            <div className="content">
              <h1 className="title">Welcome to G&G System</h1>
              <p className="subtitle">
                Your all-in-one business management suite: streamline your events, food trucks, inventory, and personnel with ease and precision.
              </p>
              <button onClick={handleGetStartedClick} className="button">
                Get Started
              </button>
              <div className="download-section">
                <h2>Download Our App</h2>
                <div className="download-buttons">
                  <Button
                    variant="contained"
                    startIcon={<Window/>}
                    href="/download/Gg-System.exe"
                    download
                  >
                    Windows
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Android/>}
                    href="/download/app-release.apk"
                    download
                  >
                    Android
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Login onSignIn={onSignIn} />
      )}
    </>
  );
};

export default GetStarted;
