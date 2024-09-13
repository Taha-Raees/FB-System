// Keypad.jsx
import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './Keypad.scss';

const Keypad = ({ onKeypadPress , receivedAmount }) => {
  const keys = [
    '7', '8', '9', 
    '4', '5', '6', 
    '1', '2', '3', 
    '0', '.', 'Delete'
  ];

  return (
   <div className="keypad-container">
    <input type="text" value={receivedAmount} readOnly className="keypad-display" />
    <Grid container spacing={1} className="keypad">
      {keys.map((key) => (
        <Grid item xs={4} key={key}>
          <Button 
            variant="contained" 
            className={`keypad-button ${key === 'Delete' ? 'delete-button' : ''}`}
            onClick={() => onKeypadPress(key)}
          >
            {key}
          </Button>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" className="keypad-button enter-button" onClick={() => onKeypadPress('Enter')}>
          Enter
        </Button>
      </Grid>
    </Grid></div>
  );
};

export default Keypad;
