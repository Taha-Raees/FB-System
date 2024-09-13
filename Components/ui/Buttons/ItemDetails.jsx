import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Select, MenuItem, TextField, List, ListItem, ListItemText
} from '@mui/material';
import { fetchItemSuppliersWithOrderHistoryByItemId, updateFoodItem, addOrderHistory } from '@/app/apiService/apiServiceFood';
import NewSupplierDialog from './NewSupplierDialog';

const ItemDetails = ({ open, onClose, item, onSave }) => {
  const [itemSuppliers, setItemSuppliers] = useState([]);
  const [restockSupplierId, setRestockSupplierId] = useState('');
  const [restockQuantity, setRestockQuantity] = useState('');
  const [showNewSupplierDialog, setShowNewSupplierDialog] = useState(false);

  const refreshSuppliers = async () => {
    const itemSuppliersData = await fetchItemSuppliersWithOrderHistoryByItemId(item.id);
    setItemSuppliers(itemSuppliersData);
  };

  useEffect(() => {
    if (open) {
      refreshSuppliers();
    }
  }, [open, item.id]);

  const handleRestock = async () => {
    const restockSupplier = itemSuppliers.find(supplier => supplier.supplierId === Number(restockSupplierId));
    if (!restockSupplier) return;

    const newQuantity = Number(restockQuantity);
    const oldQuantity = item.quantity;
    const supplierPrice = restockSupplier.price;
    const updatedQuantity = oldQuantity + newQuantity;
    const updatedCost = ((oldQuantity * item.cost) + (supplierPrice * newQuantity)) / updatedQuantity;

    try {
      await updateFoodItem(item.id, { quantity: updatedQuantity, cost: updatedCost });
      await addOrderHistory(restockSupplierId, newQuantity); // Add an order history entry
      onSave({ ...item, quantity: updatedQuantity, cost: updatedCost });
      refreshSuppliers(); // Refresh to display updated order history
      onClose();
    } catch (error) {
      console.error("Error updating item or adding order history:", error);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Item Details - Restock</DialogTitle>
      <DialogContent>
        <Typography variant="body2">Name: {item.name}</Typography>
        <Typography variant="body2">Category: {item.category}</Typography>
        <Typography variant="body2">Quantity: {item.quantity}Kg</Typography>
        <Typography variant="body2">Cost: {item.cost}€/Kg</Typography>
        <hr />
        <Select
          value={restockSupplierId}
          onChange={(e) => setRestockSupplierId(e.target.value)}
          fullWidth
        >
          <MenuItem value="">Select Supplier for Restock</MenuItem>
          {itemSuppliers.map((supplier) => (
            <MenuItem key={supplier.supplierId} value={supplier.supplierId}>
              {supplier.Supplier.name} - {supplier.price}€/Kg
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Restock Quantity"
          type="number"
          fullWidth
          value={restockQuantity}
          onChange={(e) => setRestockQuantity(e.target.value)}
          margin="normal"
        />
        {/* Order History Section */}
        <Typography variant="h6" style={{ marginTop: '20px' }}>Order History</Typography>
        {itemSuppliers.map(supplier => supplier.orderHistories.map((history, index) => (
          <List key={index}>
            <ListItem>
              <ListItemText primary={`Supplier: ${supplier.Supplier.name}`} secondary={`Quantity: ${history.quantity}, Added On: ${new Date(history.addedAt).toLocaleString()}`} />
            </ListItem>
          </List>
        )))}
      </DialogContent>
      <DialogActions>
      <Button onClick={() => setShowNewSupplierDialog(true)}>Add New Supplier</Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleRestock}>Restock</Button>
      </DialogActions>
      {showNewSupplierDialog && (
  <NewSupplierDialog
    open={showNewSupplierDialog}
    onClose={() => setShowNewSupplierDialog(false)}
    itemId={item.id}
    onSupplierAdded={refreshSuppliers} // Refresh suppliers upon addition
  />
)}
    </Dialog>
  );
};

export default ItemDetails;
