import React, { useState } from 'react';
import "./POS.scss";
import Header from './Header/Header';
import OrderList from './OrderList/OrderList';
import Menu from './Menu/Menu';
import Keypad from './Keypad/Keypad';

import CurrencyShortcuts from './CurrencyShortcuts/CurrencyShortcuts';
const POS = ({ onBack }) => {
    const [currentOrder, setCurrentOrder] = useState([]);

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
    const handleKeyPress = (key) => {
      // Handle key press logic here
    };
  
    const handleShortcutSelected = (amount) => {
      // Handle shortcut logic here
    };
  
    return (
      <div className="pos">
        <Header  className="pos-header"  onBack= {onBack}/>
        <OrderList className="order-list" orders={currentOrder} onOrderDeleted={handleOrderDeleted} />
        <Menu className="menu" onAddToOrder={handleAddToOrder} />
        <Keypad  className="keypad" onKeyPress={handleKeyPress} />
        <CurrencyShortcuts className="currency-shortcuts" onShortcutSelected={handleShortcutSelected} />
      </div>
    );
}

export default POS