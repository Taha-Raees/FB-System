import React, { useState } from 'react';
import "./POS.scss";
import Header from './Header/Header';
import OrderList from './OrderList/OrderList';
import Menu from './Menu/Menu';
import Keypad from './Keypad/Keypad';

import CurrencyShortcuts from './CurrencyShortcuts/CurrencyShortcuts';
const POS = ({ onBack }) => {
    const [currentOrder, setCurrentOrder] = useState([]);
    const [receivedAmount, setReceivedAmount] = useState('');

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
    const handleOrderDeleted = (id) => {
        setCurrentOrder(currentOrder => currentOrder.filter(order => order.id !== id));
    };
     const handleKeypadPress = (key) => {
        if (key === 'Delete') {
            setReceivedAmount(receivedAmount.slice(0, -1)); // Remove last character
        } else if (key === 'Enter') {
            // Handle enter key logic here, possibly adding the received amount to order list
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
        <Header  className="pos-header"  onBack= {onBack}/>
        <OrderList className="order-list" orders={currentOrder} onOrderDeleted={handleOrderDeleted} receivedAmount={receivedAmount}  change={calculateChange()}/>
        <Menu className="menu" onAddToOrder={handleAddToOrder} />
        <Keypad  className="keypad" onKeypadPress={handleKeypadPress} receivedAmount={receivedAmount} />
        <CurrencyShortcuts className="currency-shortcuts" onShortcutSelected={handleShortcutSelected} />
      </div>
    );
}

export default POS