import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import './LoadingOverlay.scss';

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <CircularProgress color="inherit" />
      <div className="loading-text">
        <Typography variant="h6">Loading data, please wait...</Typography>
        <Typography variant="body1">It may take up to 40 seconds due to server inactivity.</Typography>
      </div>
    </div>
  );
};

export default LoadingOverlay;
