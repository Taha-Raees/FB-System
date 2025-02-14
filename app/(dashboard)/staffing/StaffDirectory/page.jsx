"use client";
import React, { useState } from 'react';
import {
  Button,
  TextField,
  IconButton,
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
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { addStaffMember, editStaffMember, deleteStaffMember } from '@/lib/context/slices/staffSlice';
import './StaffDirectory.scss';
const StaffDirectory = () => {
  const dispatch = useDispatch();
  const staffMembers = useSelector((state) => state.staff.staffMembers);

  const [searchQuery, setSearchQuery] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleAddMember = () => {
    setEditingMember({ id: null, name: '', position: '', contact: '', salary: '', startDate: '', contractEnd: '' });
    setIsModalOpen(true);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleDeleteMember = (id) => {
    dispatch(deleteStaffMember(id));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setErrors({});
  };

  const validateFields = () => {
    const newErrors = {};
    if (!editingMember.name) newErrors.name = 'Name is required';
    if (!editingMember.position) newErrors.position = 'Position is required';
    if (!editingMember.contact) newErrors.contact = 'Contact is required';
    if (!editingMember.salary) newErrors.salary = 'Salary is required';
    if (!editingMember.startDate) newErrors.startDate = 'Start Date is required';
    if (!editingMember.contractEnd) newErrors.contractEnd = 'Contract End is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveMember = () => {
    if (!validateFields()) return;

    if (editingMember.id) {
      dispatch(editStaffMember(editingMember));
    } else {
      const newMember = { ...editingMember, id: staffMembers.length > 0 ? Math.max(...staffMembers.map(m => m.id)) + 1 : 1 };
      dispatch(addStaffMember(newMember));
    }
    handleModalClose();
  };

  const filteredStaff = staffMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery) ||
    member.position.toLowerCase().includes(searchQuery) ||
    member.contact.toLowerCase().includes(searchQuery)
  );


  return (
    <div className="staff-directory-page">
      <Typography variant="h4" component="h1" className="title">
        Staff Directory
      </Typography>
      <div className="controls">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddMember}>
          Add Member
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
         <TableHead sx={{ backgroundColor: 'rgba(25, 118, 210, 1)' }}>
            <TableRow>
              <TableCell sx={{ color: '#FFFFFF' }}>Name</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Position</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Contact</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Salary</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Start Date</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Contract End</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStaff.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>{member.contact}</TableCell>
                <TableCell>{member.salary}</TableCell>
                <TableCell>{member.startDate}</TableCell>
                <TableCell>{member.contractEnd}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" onClick={() => handleEditMember(member)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDeleteMember(member.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>{editingMember?.id ? 'Edit Member' : 'Add Member'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={editingMember?.name || ''}
            onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            label="Position"
            fullWidth
            value={editingMember?.position || ''}
            onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}
            error={!!errors.position}
            helperText={errors.position}
          />
          <TextField
            margin="dense"
            label="Contact"
            fullWidth
            value={editingMember?.contact || ''}
            onChange={(e) => setEditingMember({ ...editingMember, contact: e.target.value })}
            error={!!errors.contact}
            helperText={errors.contact}
          />
          <TextField
            margin="dense"
            label="Salary"
            fullWidth
            value={editingMember?.salary || ''}
            onChange={(e) => setEditingMember({ ...editingMember, salary: e.target.value })}
            error={!!errors.salary}
            helperText={errors.salary}
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editingMember?.startDate || ''}
            onChange={(e) => setEditingMember({ ...editingMember, startDate: e.target.value })}
            error={!!errors.startDate}
            helperText={errors.startDate}
          />
          <TextField
            margin="dense"
            label="Contract End"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editingMember?.contractEnd || ''}
            onChange={(e) => setEditingMember({ ...editingMember, contractEnd: e.target.value })}
            error={!!errors.contractEnd}
            helperText={errors.contractEnd}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveMember} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StaffDirectory;
