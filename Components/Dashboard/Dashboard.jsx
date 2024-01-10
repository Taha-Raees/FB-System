import React, { useState } from 'react';
import Sidebar from '@/Components/Sidebar/Sidebar';
import Navbar from '@/Components/Navbar/Navbar';
import Events from '@/DashboardItem/Events/Events';
import DashboardContent from '@/DashboardItem/DashboardContent/DashboardContent';
import Inventory from '@/DashboardItem/Inventory/Inventory';
import Staffing from '@/DashboardItem/Staffing/Staffing';
import "./dashboard.scss";

const Dashboard = ({ onSignOut }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Events': return <Events />;
      case 'Inventory': return <Inventory />;
      case 'Staffing': return <Staffing />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} onSignOut={onSignOut} />
      <div className="container">
        <Navbar />
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;


