// OrderList.jsx
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import './OrderList.scss';

const OrderList = ({ orders, onOrderDeleted , receivedAmount, change }) => {
  // This component now relies on the `orders` prop passed from the POS component.

  const calculateTotal = () => {
    return orders.reduce((acc, order) => acc + (order.price * order.quantity), 0).toFixed(2);
  };
  const changeColor = parseFloat(receivedAmount) < calculateTotal() ? 'negative' : 'positive';
  return (
    <div className="order-list">
      <List dense>
        <h1>Order List</h1>
        {orders.map((order, index) => (
          <ListItem key={index} className="list-item">
            <ListItemText primary={`${order.quantity} x ${order.name}`} className="item-description" />
            <div className="item-price-delete">
              <ListItemText primary={`€${(order.price * order.quantity).toFixed(2)}`} />
              <IconButton edge="end" aria-label="delete" onClick={() => onOrderDeleted(order.id)}>
                <ClearIcon />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>
      <div className="total">
                <span>Total: €{calculateTotal()}</span>
                <span>Received: €{receivedAmount}</span>
                <span className={`change ${changeColor}`}>Return: €{change}</span>
            </div>
    </div>
  );
};

export default OrderList;
