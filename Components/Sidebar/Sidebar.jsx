import React from 'react';
import { Home, Event, Person, Inventory, Chat, CalendarToday, Settings, ExitToApp, HelpOutline } from '@mui/icons-material';
import './Sidebar.scss';

const Sidebar = ({ activeMenuItem, setActiveMenuItem, onSignOut }) => {

  const handleMenuItemClick = (itemName) => {
    if (itemName === 'Sign Out') {
      onSignOut();  // handle sign out
    } else {
      setActiveMenuItem(itemName); // set the active menu item
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/images/Logo.png" alt="Company Logo" className="logo" />
      </div>
      <div className="menu">
        <div
          className={`menu-item ${activeMenuItem === 'Dashboard' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Dashboard')}
        >
          <Home /> Dashboard
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Events' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Events')}
        >
          <Event /> Events
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Staffing' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Staffing')}
        >
          <Person /> Staffing
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Inventory' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Inventory')}
        >
          <Inventory /> Inventory
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Messages' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Messages')}
        >
          <Chat /> Messages
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Calendar' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Calendar')}
        >
          <CalendarToday /> Calendar
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Setting' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Setting')}
        >
          <Settings /> Setting
        </div>
      </div>
      <hr />
      <div className="user">
        <div
          className={`user-item ${activeMenuItem === 'Sign Out' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Sign Out')}
        >
          <ExitToApp /> Sign Out
        </div>
        <div
          className={`user-item ${activeMenuItem === 'Help' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Help')}
        >
          <HelpOutline /> Help
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


