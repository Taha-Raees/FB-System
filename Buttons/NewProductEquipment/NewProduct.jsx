import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const NewProduct = ({ open, onClose, onAddProduct }) => {
  const [equipment, setequipment] = useState({ name: '', description: '', quantity: 0 });

  const handleChange = (e) => {
    setequipment({ ...equipment, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    
    if (!equipment.name || !equipment.description || !equipment.quantity) {
      alert("Please fill out all fields correctly.");
      return;
    }
    onAddProduct(equipment);
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField name="name" label="Name" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="description" label="Description" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="quantity" label="Quantity" type="number" fullWidth margin="dense" onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewProduct;
