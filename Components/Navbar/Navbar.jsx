import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="search-bar">
        <SearchIcon className="search-icon" />
        <input type="text" placeholder="Search Here" className="search-input" />
      </div>
      <div className="user-icon">
        <AccountCircleIcon />
      </div>
    </div>
  );
};

export default Navbar;
