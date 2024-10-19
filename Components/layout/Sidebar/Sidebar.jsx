"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Event, Person, Inventory, Chat, AccountTree, Euro, Settings, ExitToApp, HelpOutline, AccountCircleOutlined, Menu } from '@mui/icons-material';
import './Sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@/lib/context/slices/sidebarSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector(state => state.sidebar.collapsed);
  const [username, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  // Load username and lastname from localStorage after the component has mounted
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem('username') || '';
      const storedLastname = localStorage.getItem('lastname') || '';
      setUsername(storedUsername);
      setLastname(storedLastname);
    }
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleMenuItemClick = (menuItem, route) => {
    if (menuItem === 'Sign Out') {
      // Clear sign-in status and user data from localStorage
      localStorage.removeItem("isSignedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("lastname");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");

      // Redirect to the 'getstarted' page after signing out
      router.push('/getstarted');
    } else {
      // Navigate to the specified route
      router.push(route);
    }
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo" onClick={handleToggleSidebar}>
        {collapsed ? <Menu /> : <img src="/images/Logo4.png" alt="Company Logo" width={200} height={200} />}
      </div>
      <div className="menu">
        <div
          className={`menu-item ${pathname === '/' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Dashboard', '/')}
        >
          <Home /><span>Dashboard</span>
        </div>
        <div
          className={`menu-item ${pathname === '/events' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Events', '/events')}
        >
          <Event /><span>Events</span>
        </div>
        <div
          className={`menu-item ${pathname === '/staffing' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Staffing', '/staffing')}
        >
          <Person /><span>Staffing</span>
        </div>
        <div
          className={`menu-item ${pathname === '/inventory' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Inventory', '/inventory')}
        >
          <Inventory /><span>Inventory</span>
        </div>
        <div
          className={`menu-item ${pathname === '/workflow' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Workflow', '/workflow')}
        >
          <AccountTree /><span>Workflow</span>
        </div>
        <div
          className={`menu-item ${pathname === '/finance' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Finance', '/finance')}
        >
          <Euro /><span>Finance</span>
        </div>
        <div
          className={`menu-item ${pathname === '/messages' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Messages', '/messages')}
        >
          <Chat /><span>Messages</span>
        </div>
        <div
          className={`menu-item ${pathname === '/settings' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Settings', '/settings')}
        >
          <Settings /><span>Settings</span>
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
