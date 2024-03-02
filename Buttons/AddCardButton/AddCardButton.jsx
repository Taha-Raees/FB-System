import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const AddCardButton = ({ onAddCardToStage }) => {
  const [open, setOpen] = useState(false);
  const [cardContent, setCardContent] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setCardContent(e.target.value);
  };

  const handleSubmit = () => {
    onAddCardToStage(cardContent);
    setCardContent(''); // Reset the content
    handleClose(); // Close the dialog after submission
  };

  return (
    <>
      <Add className='add-card-btn' onClick={handleOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Card</DialogTitle>
        <DialogContent>
          <TextField
            name="content"
            label="Card Content"
            fullWidth
            margin="dense"
            value={cardContent}
            onChange={handleChange}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCardButton;