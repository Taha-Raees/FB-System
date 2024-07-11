// LoadingOverlay.jsx
import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import './LoadingOverlay.scss';

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <CircularProgress color="inherit" />
      <Typography variant="h6" style={{ marginTop: 20 }}>Loading data, please wait...</Typography>
    </div>
  );
};

export default LoadingOverlay;
