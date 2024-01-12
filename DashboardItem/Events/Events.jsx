import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EventIcon from '@mui/icons-material/Event';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BudgetIcon from '@mui/icons-material/AttachMoney';
import AllocationIcon from '@mui/icons-material/AllInbox';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreateEvent from '@/DashboardItem/Events/EventsItem/CreateEvent/CreateEvent';

// Import other components similarly
import './Events.scss';

const Events = ({onShowBackButtonChange }) => {
  const [currentView, setCurrentView] = useState('menu');
  useEffect(() => {
    // Inform Dashboard to show the back button when not on the main menu
    onShowBackButtonChange(currentView !== 'menu');
  }, [currentView, onShowBackButtonChange]);
  const renderView = () => {
    switch(currentView) {
      case 'create':
        return <CreateEvent onBack={() => setCurrentView('menu')} />;
       // case 'manage':
      //   return <ManageEvent />;
      // case 'analytics':
      //   return <EventAnalytics />;
      // Add cases for other views
      default:
        return renderMenu();
    }
  };
  const renderMenu = () => (
    <>
      <Card variant="outlined" className="event-card" onClick={() => setCurrentView('create')}>
      <CardContent>
              <EventIcon className="card-icon" />
              <Typography variant="h5" component="h2">Create Event</Typography>
              <Typography variant="body2">Plan and schedule new events.</Typography>
            </CardContent>
      </Card>
      <Card variant="outlined" className="event-card" onClick={() => setCurrentView('manage')}>
      <CardContent>
          <AnalyticsIcon className="card-icon" />
          <Typography variant="h5" component="h2">Manage Event</Typography>
          <Typography variant="body2">Organize and oversee your events.</Typography>
        </CardContent>
      </Card>
      <Card variant="outlined" className="event-card" onClick={() => setCurrentView('analytics')}>
      <CardContent>
          <AnalyticsIcon className="card-icon" />
          <Typography variant="h5" component="h2">Event Analytics</Typography>
          <Typography variant="body2">View detailed event statistics and insights.</Typography>
        </CardContent>
      </Card>
      {/* Budget Management */}
      <Card variant="outlined" className="event-card">
        <CardContent>
          <BudgetIcon className="card-icon" />
          <Typography variant="h5" component="h2">Budget Management</Typography>
          <Typography variant="body2">Track and manage event budgets effectively.</Typography>
        </CardContent>
      </Card>

      {/* Resource Allocation */}
      <Card variant="outlined" className="event-card">
        <CardContent>
          <AllocationIcon className="card-icon" />
          <Typography variant="h5" component="h2">Resource Allocation</Typography>
          <Typography variant="body2">Allocate resources for maximum efficiency.</Typography>
        </CardContent>
      </Card>

      {/* Task Assignments */}
      <Card variant="outlined" className="event-card">
        <CardContent>
          <AssignmentIcon className="card-icon" />
          <Typography variant="h5" component="h2">Task Assignments</Typography>
          <Typography variant="body2">Assign and track tasks for your team.</Typography>
        </CardContent>
      </Card>

      {/* Notifications/Reminders */}
      <Card variant="outlined" className="event-card">
        <CardContent>
          <NotificationsIcon className="card-icon" />
          <Typography variant="h5" component="h2">Notifications/Reminders</Typography>
          <Typography variant="body2">Set up alerts for important milestones.</Typography>
        </CardContent>
      </Card>
      {/* Add more Cards for other options */}
    </>
  );
  

  return (
    <div className="events-page">
      {renderView()}
    </div>
  );
};

export default Events;

