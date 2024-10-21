import React from 'react';
import { Alert, AlertTitle, Fade } from '@mui/material';
import './LoadingOverlay.scss';

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-animation">
          <div className="circle-container">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="circle" />
            ))}
          </div>
          <div className="pulse-ring"></div>
        </div>
        
        <Fade in={true} timeout={1000}>
          <Alert 
            severity="info" 
            variant="filled"
            sx={{
              backgroundColor: '#AD9551',
              color: '#152039',
              '& .MuiAlert-icon': {
                color: '#152039'
              }
            }}
          >
            <AlertTitle sx={{ fontWeight: 'bold' }}>Loading data, please wait...</AlertTitle>
            It may take up to 40 seconds due to server inactivity.
          </Alert>
        </Fade>
      </div>
    </div>
  );
};

export default LoadingOverlay;