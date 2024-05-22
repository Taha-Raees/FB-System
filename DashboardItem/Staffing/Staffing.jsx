import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentsIcon from '@mui/icons-material/Payments';
import StaffDirectory from './StaffingItem/StaffDirectory/StaffDirectory';
import TaskAssignments from './StaffingItem/TaskAssignments/TaskAssignments';
import Payroll from './StaffingItem/Payroll/Payroll';
import './Staffing.scss';

const Staffing = () => {
  const [currentView, setCurrentView] = useState('menu');

  const loadFromLocalStorage = (key, defaultValue) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  const [staffMembers, setStaffMembers] = useState(loadFromLocalStorage('staffMembers', [
    { id: 1, name: 'John Doe', position: 'Manager', contact: 'john.doe@example.com', salary: 50, startDate: '2023-01-01', contractEnd: '2025-01-01' },
    { id: 2, name: 'Jane Smith', position: 'Chef', contact: 'jane.smith@example.com', salary: 40, startDate: '2022-06-01', contractEnd: '2024-06-01' },
    // Add more staff members as needed
  ]));

  const [tasks, setTasks] = useState(loadFromLocalStorage('tasks', [
    { id: 1, name: 'Inventory Management', date: '2023-01-01', startTime: '09:00', endTime: '11:00', assignedTo: 1 },
    { id: 2, name: 'Customer Service', date: '2023-01-02', startTime: '11:00', endTime: '13:00', assignedTo: 2 },
    // Add more tasks as needed
  ]));

  useEffect(() => {
    localStorage.setItem('staffMembers', JSON.stringify(staffMembers));
  }, [staffMembers]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const renderView = () => {
    switch (currentView) {
      case 'staffDirectory':
        return <StaffDirectory staffMembers={staffMembers} setStaffMembers={setStaffMembers} onBack={() => setCurrentView('menu')} />;
      case 'taskAssignments':
        return <TaskAssignments staffMembers={staffMembers} tasks={tasks} setTasks={setTasks} onBack={() => setCurrentView('menu')} />;
      case 'payroll':
        return <Payroll staffMembers={staffMembers} tasks={tasks} onBack={() => setCurrentView('menu')} />;
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
