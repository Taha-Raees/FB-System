"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentsIcon from '@mui/icons-material/Payments';
import './Staffing.scss';

const Staffing = () => {
  const router = useRouter(); // Initialize router


  const handleNavigation = (path) => {
    router.push(path);

  };

  return (
    <div className="staffing-page">
      {/* Staff Directory */}
      <Card variant="outlined" className="staffing-card" onClick={() => handleNavigation('/staffing/StaffDirectory')}>
        <CardContent>
          <PeopleIcon className="card-icon" />
          <Typography variant="h5" component="h2">Staff Directory</Typography>
          <Typography variant="body2">Manage staff profiles and contact information.</Typography>
        </CardContent>
      </Card>

      {/* Task Assignments */}
      <Card variant="outlined" className="staffing-card" onClick={() => handleNavigation('/staffing/TaskAssignments')}>
        <CardContent>
          <AssignmentIcon className="card-icon" />
          <Typography variant="h5" component="h2">Task Assignments</Typography>
          <Typography variant="body2">Allocate and track staff tasks.</Typography>
        </CardContent>
      </Card>

      {/* Payroll & Benefits */}
      <Card variant="outlined" className="staffing-card" onClick={() => handleNavigation('/staffing/Payroll')}>
        <CardContent>
          <PaymentsIcon className="card-icon" />
          <Typography variant="h5" component="h2">Payroll</Typography>
          <Typography variant="body2">Manage payroll and benefits.</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Staffing;
