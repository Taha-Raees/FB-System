import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = ({ onBack }) => {
    return (
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={onBack} 
        style={{ color: '#AD9551' }} // Custom color applied
      >
      </Button>
    );
  };

export default BackButton;
