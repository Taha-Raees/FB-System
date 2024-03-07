import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const NewProduct = ({ open, onClose, onAddProduct }) => {
  // Remove the maintenance field from the initial state
  const [product, setProduct] = useState({ name: '', category: '', description: '' });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Ensure basic validation for required fields is in place
    if (!product.name || !product.category || !product.description) {
      alert("Please fill out all fields correctly.");
      return;
    }
    // Call the onAddProduct function with the product state
    onAddProduct(product);
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField name="name" label="Name" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="category" label="Category" fullWidth margin="dense" onChange={handleChange} />
        <TextField name="description" label="Description" fullWidth margin="dense" onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewProduct;
