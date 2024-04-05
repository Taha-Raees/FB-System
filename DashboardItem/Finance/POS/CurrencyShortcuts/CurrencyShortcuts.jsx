// CurrencyShortcuts.jsx
import React from 'react';
import Button from '@mui/material/Button';
import './CurrencyShortcuts.scss';

const shortcuts = [5, 10, 20, 50, 100, 200];

const CurrencyShortcuts = ({ onShortcutSelected }) => {
  return (
    <div className="currency-shortcuts">
      {shortcuts.map((amount, index) => (
        <Button
          key={index}
          variant="contained"
          color="secondary"
          className="shortcut-button"
          onClick={() => onShortcutSelected(amount)}
        >
          €{amount}
        </Button>
      ))}
    </div>
  );
};

export default CurrencyShortcuts;
