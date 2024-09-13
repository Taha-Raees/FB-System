"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import './Navbar.scss';
import { InputAdornment, TextField } from '@mui/material';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown
  const router = useRouter();

  // Load username and lastname from localStorage after the component has mounted
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem('username') || '';
      const storedLastname = localStorage.getItem('lastname') || '';
      setUsername(storedUsername);
      setLastname(storedLastname);
    }
  }, []);

  // Handle dropdown options
  const handleMenuClick = (route) => {
    setDropdownOpen(false); // Close the dropdown when an option is clicked
    router.push(route);
  };

  const handleSignOut = () => {
    // Clear sign-in status and user data from localStorage
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("lastname");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");

    // Redirect to the 'getstarted' page after signing out
    router.push('/getstarted');
  };

  return (
    <div className="navbar">
      <div className="user-section">
        <div className="user-info" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <AccountCircleOutlined className="user-icon" />
          <span>{username} {lastname}</span>
          <ArrowDropDown />
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => handleMenuClick('/account')}>
              Account
            </div>
            <div className="dropdown-item" onClick={() => handleMenuClick('/help')}>
              Help
            </div>
            <div className="dropdown-item" onClick={handleSignOut}>
              Sign Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
