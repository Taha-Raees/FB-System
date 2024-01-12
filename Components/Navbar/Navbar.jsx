import React from 'react';
import { useNavigation } from '@/ContextApi/NavigationContext'; // Adjust the import path
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BackButton from '@/Buttons/BackButton/BackButton'; // Ensure this path is correct
import './Navbar.scss';

const Navbar = () => {
  const { showBackButton, handleBack } = useNavigation();

  return (
    <div className="navbar">
      {showBackButton && <BackButton onBack={handleBack} />}
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
