import React, { useState, useEffect } from 'react';
import Sidebar from '@/Components/Sidebar/Sidebar';
import Events from '@/DashboardItem/Events/Events';
import DashboardContent from '@/DashboardItem/DashboardContent/DashboardContent';
import Inventory from '@/DashboardItem/Inventory/Inventory';
import Staffing from '@/DashboardItem/Staffing/Staffing';
import "./dashboard.scss";
import MessagingApp from '@/DashboardItem/Messages/MessagingApp';
import KanbanBoard from '@/DashboardItem/Workflow/KanbanBoard';
import Account from '@/DashboardItem/Account/Account';

const Dashboard = ({ onSignOut }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    // On load, check if there's an active menu item state persisted
    const savedActiveMenuItem = localStorage.getItem("activeMenuItem");
    if (savedActiveMenuItem) {
      setActiveMenuItem(savedActiveMenuItem);
      setShowBackButton(savedActiveMenuItem !== 'Dashboard'); // Assuming you want the back button visible for non-dashboard menu items
    }
  }, []);

  useEffect(() => {
    // Save the active menu item state whenever it changes
    localStorage.setItem("activeMenuItem", activeMenuItem);
  }, [activeMenuItem]);

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
      case 'Messages':
        return <MessagingApp />;
      case 'Workflow':
        return <KanbanBoard />;
      case 'Finance':
        return <DashboardContent />;
      case 'Account':
        return <Account />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="dashboard">
      <div className="sideBar">
      <Sidebar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} onSignOut={onSignOut} />
      </div>
      <div className="dashboard-content">
      {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;


