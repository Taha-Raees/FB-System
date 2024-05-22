import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';
import './Payroll.scss';
import BackButton from '@/Buttons/BackButton/BackButton';

const Payroll = ({ staffMembers, tasks, onBack }) => {
  const [payrollData, setPayrollData] = useState([]);

  useEffect(() => {
    const calculatePayroll = () => {
      const payroll = staffMembers.map(member => {
        const memberTasks = tasks.filter(task => task.assignedTo === member.id);
        const totalHoursWorked = memberTasks.reduce((total, task) => {
          const start = new Date(`1970-01-01T${task.startTime}:00`);
          const end = new Date(`1970-01-01T${task.endTime}:00`);
          const hoursWorked = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
          return total + hoursWorked;
        }, 0);
        const totalSalary = member.salary * totalHoursWorked;
        return {
          ...member,
          totalHoursWorked,
          totalSalary
        };
      });
      setPayrollData(payroll);
    };

    calculatePayroll();
  }, [staffMembers, tasks]);

  return (
    <div className="payroll-page">
      <BackButton onBack={onBack} />
      <Typography variant="h4" component="h1" className="title">
        Payroll
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Total Hours Worked</TableCell>
              <TableCell>Hourly Rate</TableCell>
              <TableCell>Total Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrollData.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>{member.totalHoursWorked.toFixed(2)}</TableCell>
                <TableCell>{member.salary.toFixed(2)}</TableCell>
                <TableCell>{member.totalSalary.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Payroll;
