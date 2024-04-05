import React, { useState } from 'react';
import "./POS.scss";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Header from './Header/Header';
import OrderList from './OrderList/OrderList';
import Menu from './Menu/Menu';
import Keypad from './Keypad/Keypad';
import Orders from './Orders/Orders';
import { v4 as uuidv4 } from 'uuid'; 

import CurrencyShortcuts from './CurrencyShortcuts/CurrencyShortcuts';
const POS = ({ onBack }) => {
    const [currentOrder, setCurrentOrder] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [receivedAmount, setReceivedAmount] = useState('');
    const [activeTab, setActiveTab] = useState('MENU');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info',
    });

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleAddToOrder = (menuItem) => {
        setCurrentOrder(currentOrder => {
            // Check if the item is already in the order
            const existingOrderIndex = currentOrder.findIndex(order => order.id === menuItem.id);
            if (existingOrderIndex !== -1) {
                // If item exists, update the quantity
                return currentOrder.map((order, index) => {
                    if (index === existingOrderIndex) {
                        return { ...order, quantity: order.quantity + 1 };
                    }
                    return order;
                });
            } else {
                // If item does not exist, add it to the order
                return [...currentOrder, { ...menuItem, quantity: 1 }];
            }
        });
    };
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        // Perform other actions if needed when tab changes
    };
    const handleOrderDeleted = (id) => {
        setCurrentOrder(currentOrder => currentOrder.filter(order => order.id !== id));
    };
    const handleOrderCompleted = () => {
        const total = calculateTotal();
        const change = calculateChange();

        // Check if the received amount is not less than the total
        if (parseFloat(receivedAmount) >= parseFloat(total)) {
            const newOrder = {
                id: uuidv4(), // Generate a unique ID for the order
                items: currentOrder,
                total: total,
                received: receivedAmount,
                change: change,
                timestamp: new Date()
            };

            // Save the new order and reset the current order and received amount
            setCompletedOrders([...completedOrders, newOrder]);
            setCurrentOrder([]);
            setReceivedAmount('');
            showSnackbar('Order is successfully entered', 'success');
        } else {
            // Handle the case where the amount received is insufficient
            showSnackbar('Insufficient amount received. Please enter a sufficient amount.', 'error');
        
        }
    };
     const handleKeypadPress = (key) => {
        if (key === 'Delete') {
            setReceivedAmount(receivedAmount.slice(0, -1)); // Remove last character
        } else if (key === 'Enter') {
            handleOrderCompleted();
        } else {
            setReceivedAmount(receivedAmount + key); // Add pressed key to received amount
        }
    };

    const calculateTotal = () => {
        return currentOrder.reduce((acc, order) => acc + (order.price * order.quantity), 0).toFixed(2);
    };

    const calculateChange = () => {
        // If no amount received, change should be 0
        if (!receivedAmount) {
            return '0.00';
        }
        const total = parseFloat(calculateTotal());
        const received = parseFloat(receivedAmount); // No need for the || 0 here
        return (received - total).toFixed(2); // Calculate change normally
    };
  
    const handleShortcutSelected = (amount) => {
      // Handle shortcut logic here
    };
  
    return (
      <div className="pos">
         <Header className="pos-header" onTabChange={handleTabChange} onBack={onBack} />
         <OrderList className="order-list" orders={currentOrder} onOrderDeleted={handleOrderDeleted} receivedAmount={receivedAmount}  change={calculateChange()}/>
        {activeTab === 'MENU' && <Menu className="menu-grid" onAddToOrder={handleAddToOrder} />}
        {activeTab === 'ORDERS' && <Orders className="menu-grid" completedOrders={completedOrders} />}
        
        <Keypad  className="keypad" onKeypadPress={handleKeypadPress} receivedAmount={receivedAmount} />
        <CurrencyShortcuts className="currency-shortcuts" onShortcutSelected={handleShortcutSelected} />
        {/* Snackbar for alerting insufficient amount */}
        <Snackbar 
                open={snackbar.open} 
                autoHideDuration={6000} 
                onClose={handleSnackbarClose}
                onClick={handleSnackbarClose} // Snackbar will close when anywhere on the screen is clicked
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbar.severity}>
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
      </div>
    );
}

export default POS