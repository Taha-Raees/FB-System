import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { createSupplier, createItemSupplierRelation } from '@/app/apiService/apiServiceFood';

const NewSupplierDialog = ({ open, onClose, itemId, onSupplierAdded }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async () => {
    try {
      const supplier = await createSupplier({ name, contact });
      if (supplier && supplier.id) {
        await createItemSupplierRelation({
          itemId, 
          supplierId: supplier.id, 
          price: parseFloat(price) // Ensure price is correctly formatted as a float
        });
        onSupplierAdded(); // Inform the parent component to refresh data
      }
      console.log("Closing dialog");
      onClose(); // Close the dialog
    } catch (error) {
      console.error("Error adding new supplier:", error.message || error);
    }
    finally {
        onClose(); // This ensures the dialog attempts to close whether the request succeeds or fails.
      }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Supplier</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Supplier Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Supplier Contact"
          fullWidth
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Price (€/Kg)"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewSupplierDialog;