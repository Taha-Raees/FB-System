"use client";
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './Payroll.scss';
import { useSelector } from 'react-redux'; // Import useSelector to get Redux state

const Payroll = () => {
  const staffMembers = useSelector((state) => state.staff.staffMembers); // Access staff members from Redux store
  const tasks = useSelector((state) => state.tasks.tasks); // Access tasks from Redux store
  const [payrollData, setPayrollData] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  // Calculate payroll based on staff members and tasks
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
        const hourlyRate = parseFloat(member.salary) || 0; // Convert salary to float
        const totalSalary = hourlyRate * totalHoursWorked;
        return {
          ...member,
          totalHoursWorked,
          hourlyRate,
          totalSalary,
          memberTasks
        };
      });
      setPayrollData(payroll);
    };

    calculatePayroll();
  }, [staffMembers, tasks]);

  const handleRowClick = (member) => {
    setSelectedMember(member);
    setIsMemberModalOpen(true);
  };

  const handleModalClose = () => {
    setIsMemberModalOpen(false);
    setSelectedMember(null);
  };

  // Generate PDF using jsPDF
  const handleDownloadPDF = async () => {
    const pdf = new jsPDF();
    
    const addLogoToPDF = () => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = '/Logo.png'; // Corrected image path
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', 10, 5, 35, 35); // Adjusted height to 35
          resolve();
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      });
    };

    try {
      await addLogoToPDF();
      pdf.setFontSize(18);
      pdf.text(`${selectedMember.name}'s Payslip`, 10, 50);
      pdf.setFontSize(10.6);
      pdf.text(`Position: ${selectedMember.position}`, 10, 60);
      pdf.text(`Contact: ${selectedMember.contact}`, 10, 70);
      pdf.text(`Hourly Rate: €${selectedMember.hourlyRate.toFixed(2)}/hr`, 10, 80);
      
      const startY = 90;
      const colWidths = [50, 40, 30, 30, 30]; // Customize column widths
      const colTitles = ['Task', 'Date', 'Start Time', 'End Time', 'Hours Worked'];

      pdf.autoTable({
        startY,
        head: [colTitles],
        body: selectedMember.memberTasks.map(task => {
          const start = new Date(`1970-01-01T${task.startTime}:00`);
          const end = new Date(`1970-01-01T${task.endTime}:00`);
          const hoursWorked = (end - start) / (1000 * 60 * 60);
          return [task.name, task.date, task.startTime, task.endTime, hoursWorked.toFixed(2)];
        }),
        theme: 'striped',
        headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
        styles: { cellPadding: 3, fontSize: 10, overflow: 'linebreak' },
        columnStyles: {
          0: { cellWidth: colWidths[0] },
          1: { cellWidth: colWidths[1] },
          2: { cellWidth: colWidths[2] },
          3: { cellWidth: colWidths[3] },
          4: { cellWidth: colWidths[4] },
        }
      });

      pdf.setFontSize(10.6);
      pdf.text(`Total Hours Worked: ${selectedMember.totalHoursWorked.toFixed(2)}`, 10, pdf.autoTable.previous.finalY + 10);
      pdf.text(`Total Salary: €${selectedMember.totalSalary.toFixed(2)}`, 10, pdf.autoTable.previous.finalY + 20);

      pdf.save(`${selectedMember.name}_Payroll.pdf`);
    } catch (error) {
      console.error('Error adding logo to PDF:', error);
    }
  };

  return (
    <div className="payroll-page">
     
      <Typography variant="h4" component="h1" className="title">
        Payroll
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: 'rgba(25, 118, 210, 1)' }}>
            <TableRow>
              <TableCell sx={{ color: '#FFFFFF' }}>Name</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Position</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Total Hours Worked</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Hourly Rate</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Total Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrollData.map((member) => (
              <TableRow key={member.id} onClick={() => handleRowClick(member)} style={{ cursor: 'pointer' }}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>{member.totalHoursWorked.toFixed(2)}</TableCell>
                <TableCell>{member.hourlyRate.toFixed(2)}</TableCell>
                <TableCell>{member.totalSalary.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedMember && (
        <Dialog open={isMemberModalOpen} onClose={handleModalClose} maxWidth="md" fullWidth>
          <DialogTitle>{selectedMember.name}'s Payslip</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1">
              <strong>Position:</strong> {selectedMember.position}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Contact:</strong> {selectedMember.contact}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Hourly Rate:</strong> €{selectedMember.hourlyRate.toFixed(2)}/hr
            </Typography>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Tasks Worked On
            </Typography>
            <TableContainer component={Paper} style={{ marginTop: '10px' }}>
              <Table>
              <TableHead sx={{ backgroundColor: 'rgba(25, 118, 210, 1)' }}>
               <TableRow>
                <TableCell sx={{ color: '#FFFFFF' }}>Task</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>Date</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>Start Time</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>End Time</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>Hours Worked</TableCell>
               </TableRow>
              </TableHead>
                <TableBody>
                  {selectedMember.memberTasks.map(task => {
                    const start = new Date(`1970-01-01T${task.startTime}:00`);
                    const end = new Date(`1970-01-01T${task.endTime}:00`);
                    const hoursWorked = (end - start) / (1000 * 60 * 60);
                    return (
                      <TableRow key={task.id}>
                        <TableCell>{task.name}</TableCell>
                        <TableCell>{task.date}</TableCell>
                        <TableCell>{task.startTime}</TableCell>
                        <TableCell>{task.endTime}</TableCell>
                        <TableCell>{hoursWorked.toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
              <strong>Total Hours Worked:</strong> {selectedMember.totalHoursWorked.toFixed(2)}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Total Salary:</strong> €{selectedMember.totalSalary.toFixed(2)}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              Close
            </Button>
            <Button onClick={handleDownloadPDF} color="primary">
              Download PDF
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Payroll;
