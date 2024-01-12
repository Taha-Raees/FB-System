import React, { useState, useEffect } from 'react';
import Sidebar from '@/Components/Sidebar/Sidebar';
import Navbar from '@/Components/Navbar/Navbar';
import Events from '@/DashboardItem/Events/Events';
import DashboardContent from '@/DashboardItem/DashboardContent/DashboardContent';
import Inventory from '@/DashboardItem/Inventory/Inventory';
import Staffing from '@/DashboardItem/Staffing/Staffing';
import "./dashboard.scss";

const Dashboard = ({ onSignOut }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [showBackButton, setShowBackButton] = useState(false);

  const handleBack = () => {
    setActiveMenuItem('Dashboard');
    setShowBackButton(false);
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Events':
        return <Events onShowBackButtonChange={setShowBackButton} />;
      case 'Inventory':
        return <Inventory />;
      case 'Staffing':
        return <Staffing />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} onSignOut={onSignOut} />
      <div className="container">
        <Navbar showBackButton={showBackButton} onBack={handleBack} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;

