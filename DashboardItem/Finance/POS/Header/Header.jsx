// Header.jsx
import React, { useState } from 'react';
import './Header.scss';

const Header = ({ onBack, onTabChange }) => {
  const [activeTab, setActiveTab] = useState('MENU');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Update the activeTab state
    onTabChange(tabName); // Notify the parent component of the tab change

    if (tabName === 'SIGNOUT') {
      if (onBack) onBack(); // Call the onBack callback if provided
    }
  };

  return (
    <header className="pos-header">
      <div 
        className={`header-tab ${activeTab === 'MENU' ? 'active-tab' : ''}`}
        onClick={() => handleTabClick('MENU')}
      >
        MENU
      </div>
      <div 
        className={`header-tab ${activeTab === 'ORDERS' ? 'active-tab' : ''}`}
        onClick={() => handleTabClick('ORDERS')}
      >
        ORDERS
      </div>
      <div 
        className={`header-tab ${activeTab === 'SIGNOUT' ? 'active-tab' : ''}`}
        onClick={() => handleTabClick('SIGNOUT')}
      >
        Go Back
      </div>
    </header>
  );
};

export default Header;
