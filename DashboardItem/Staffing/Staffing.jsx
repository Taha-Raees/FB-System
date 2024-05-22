import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentsIcon from '@mui/icons-material/Payments';
import StaffDirectory from './StaffingItem/StaffDirectory/StaffDirectory';
import TaskAssignments from './StaffingItem/TaskAssignments/TaskAssignments';
import './Staffing.scss';

const Staffing = () => {
  const [currentView, setCurrentView] = useState('menu');

  const [staffMembers, setStaffMembers] = useState([
    { id: 1, name: 'John Doe', position: 'Manager', contact: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', position: 'Chef', contact: 'jane.smith@example.com' },
    // Add more staff members as needed
  ]);

  const renderView = () => {
    switch (currentView) {
      case 'staffDirectory':
        return <StaffDirectory staffMembers={staffMembers} setStaffMembers={setStaffMembers} onBack={() => setCurrentView('menu')} />;
      case 'taskAssignments':
        return <TaskAssignments staffMembers={staffMembers} setStaffMembers={setStaffMembers} onBack={() => setCurrentView('menu')} />;
      // Add cases for other views here
      default:
        return renderMenu();
    }
  };

  const renderMenu = () => (
    <>
      {/* Staff Directory */}
      <Card variant="outlined" className="staffing-card" onClick={() => setCurrentView('staffDirectory')}>
        <CardContent>
          <PeopleIcon className="card-icon" />
          <Typography variant="h5" component="h2">Staff Directory</Typography>
          <Typography variant="body2">Manage staff profiles and contact information.</Typography>
        </CardContent>
      </Card>

      {/* Task Assignments */}
      <Card variant="outlined" className="staffing-card" onClick={() => setCurrentView('taskAssignments')}>
        <CardContent>
          <AssignmentIcon className="card-icon" />
          <Typography variant="h5" component="h2">Task Assignments</Typography>
          <Typography variant="body2">Allocate and track staff tasks.</Typography>
        </CardContent>
      </Card>

      {/* Payroll & Benefits */}
      <Card variant="outlined" className="staffing-card" onClick={() => setCurrentView('payroll')}>
        <CardContent>
          <PaymentsIcon className="card-icon" />
          <Typography variant="h5" component="h2">Payroll</Typography>
          <Typography variant="body2">Manage payroll and benefits.</Typography>
        </CardContent>
      </Card>

      {/* Additional features */}
      {/* Add more cards for other features like Schedule Management, etc. */}
    </>
  );

  return (
    <div className="staffing-page">
      {renderView()}
    </div>
  );
};

export default Staffing;
