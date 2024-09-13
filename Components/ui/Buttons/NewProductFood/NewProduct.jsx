import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const NewProduct = ({ open, onClose, onAddProduct }) => {
  const [foodItem, setfoodItem] = useState({ name: '', category: '', quantity: 0, expiry: '' });

  const handleChange = (e) => {
    setfoodItem({ ...foodItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    
    if (!foodItem.name || !foodItem.category || !foodItem.quantity|| !foodItem.expiry) {
      alert("Please fill out all fields correctly.");
      return;
    }
    onAddProduct(foodItem);
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField name="name" label="Name" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="category" label="Category" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="quantity" label="Quantity" type="number" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="expiry" label="Expiry Date"  fullWidth margin="dense" onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewProduct;
