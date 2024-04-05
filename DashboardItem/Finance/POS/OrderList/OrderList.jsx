// OrderList.jsx
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './OrderList.scss';

const OrderList = ({ orders, onOrderDeleted }) => {
  // This component now relies on the `orders` prop passed from the POS component.

  const calculateTotal = () => {
    return orders.reduce((acc, order) => acc + (order.price * order.quantity), 0).toFixed(2);
  };

  return (
    <div className="order-list">
      
      <List dense>
        <h1>Order List</h1>
        {orders.map((order, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => onOrderDeleted(order.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={`${order.quantity} x ${order.name}`} secondary={`€${(order.price * order.quantity).toFixed(2)}`} />
          </ListItem>
        ))}
      </List>
      <div className="total">
        <span>Total: €{calculateTotal()}</span>
      </div>
    </div>
  );
};

export default OrderList;
