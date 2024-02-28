import React, { useState } from 'react';
import { Home, Event, Person, Inventory, Chat, CalendarToday, Settings, ExitToApp, HelpOutline, MenuOpen, AccountCircleOutlined, Menu } from '@mui/icons-material';
import './Sidebar.scss';


const Sidebar = ({ activeMenuItem, setActiveMenuItem, onSignOut }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuItemClick = (itemName) => {
    if (itemName === 'Sign Out') {
      onSignOut(); // handle sign out
    } else {
      setActiveMenuItem(itemName); // set the active menu item
    }
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo" onClick={() => setCollapsed(!collapsed)}>
        {/* Toggle collapse icon */}
        {collapsed ? <Menu/> : <img src="/images/Logo.png" alt="Company Logo" width={200} height={200} />}
      </div>
      <div className="menu">
        <div
          className={`menu-item ${activeMenuItem === 'Dashboard' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Dashboard')}
        >
          <Home /><span>Dashboard</span>
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Events' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Events')}
        >
          <Event /><span>Events</span>
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Staffing' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Staffing')}
        >
          <Person /><span>Staffing</span>
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Inventory' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Inventory')}
        >
          <Inventory /><span>Inventory</span>
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Messages' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Messages')}
        >
          <Chat /><span>Messages</span>
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Calendar' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Calendar')}
        >
          <CalendarToday /><span>Calendar</span>
        </div>
        <div
          className={`menu-item ${activeMenuItem === 'Settings' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Settings')}
        >
          <Settings /><span>Settings</span>
        </div>
      </div>
      <hr />
      <div className="user">
      <div
          className={`user-item ${activeMenuItem === 'Account' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Account')}
        >
          <AccountCircleOutlined /><span>Account</span>
        </div>
        <div
          className={`user-item ${activeMenuItem === 'Sign Out' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Sign Out')}
        >
          <ExitToApp /><span>Sign Out</span>
        </div>
        <div
          className={`user-item ${activeMenuItem === 'Help' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Help')}
        >
          <HelpOutline /><span>Help</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

