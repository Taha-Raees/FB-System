import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const NewProduct = ({ open, onClose, onAddProduct }) => {
  const [product, setProduct] = useState({ name: '', category: '', quantity: 0, description: '', expiry: '' });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAddProduct(product);
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField name="name" label="Name" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="category" label="Category" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="quantity" label="Quantity" type="number" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="description" label="Description" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="expiry" label="Expiry Date" type="date" fullWidth margin="dense" onChange={handleChange} InputLabelProps={{ shrink: true }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewProduct;
