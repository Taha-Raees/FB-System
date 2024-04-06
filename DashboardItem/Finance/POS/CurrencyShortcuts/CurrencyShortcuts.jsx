// CurrencyShortcuts.jsx
import React from 'react';
import Button from '@mui/material/Button';
import './CurrencyShortcuts.scss';

const shortcuts = [
  { amount: 5, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/5-Euro.svg/2560px-5-Euro.svg.png' },
  { amount: 10, img: 'https://cdn.pixabay.com/photo/2013/07/23/15/50/dollar-bill-166307_1280.jpg' },
  { amount: 20, img: 'https://shop.brot-fuer-die-welt.de/media/90/54/ce/1616747946/113102100_20-euro-01.jpg' },
  { amount: 50, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/50-Euro.svg/2560px-50-Euro.svg.png' },
  { amount: 100, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/100-Euro.svg/1024px-100-Euro.svg.png' },
  { amount: 200, img: 'https://cdn.pixabay.com/photo/2013/07/23/16/01/dollar-bill-166311_1280.jpg' },
];

const CurrencyShortcuts = ({ onShortcutSelected }) => {
  return (
    <div className="currency-shortcuts">
      {shortcuts.map((shortcut, index) => (
        <button
          key={index}
          className="shortcut-button"
          onClick={() => onShortcutSelected(shortcut.amount)}
          style={{ background: `url(${shortcut.img}) no-repeat center center`, backgroundSize: 'cover', border: 'none', width: '100px', height: '50px' }}
          title={`€${shortcut.amount}`}
        >
          {/* You can opt to have no text or overlay the amount on the image */}
        </button>
      ))}
    </div>
  );
};

export default CurrencyShortcuts;
