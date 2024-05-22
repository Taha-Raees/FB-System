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
import './StaffDirectory.scss';
import BackButton from '@/Buttons/BackButton/BackButton';

const StaffDirectory = ({ onBack,staffMembers,setStaffMembers }) => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleAddMember = () => {
    setEditingMember({ id: null, name: '', position: '', contact: '' });
    setIsModalOpen(true);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleDeleteMember = (id) => {
    setStaffMembers(staffMembers.filter(member => member.id !== id));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleSaveMember = () => {
    if (editingMember.id) {
      setStaffMembers(staffMembers.map(member => (member.id === editingMember.id ? editingMember : member)));
    } else {
      setEditingMember({ ...editingMember, id: staffMembers.length + 1 });
      setStaffMembers([...staffMembers, editingMember]);
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
      <BackButton onBack={onBack} />
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
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStaff.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>{member.contact}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditMember(member)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteMember(member.id)}>
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
          />
          <TextField
            margin="dense"
            label="Position"
            fullWidth
            value={editingMember?.position || ''}
            onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contact"
            fullWidth
            value={editingMember?.contact || ''}
            onChange={(e) => setEditingMember({ ...editingMember, contact: e.target.value })}
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
