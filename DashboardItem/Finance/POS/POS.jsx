import React, { useState, useEffect } from 'react';
import "./POS.scss";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Header from './Header/Header';
import OrderList from './OrderList/OrderList';
import Menu from './Menu/Menu';
import Keypad from './Keypad/Keypad';
import Orders from './Orders/Orders';
import SelectEventAndPosPopup from './SelectEventAndPosPopup';
import { v4 as uuidv4 } from 'uuid'; 
import CurrencyShortcuts from './CurrencyShortcuts/CurrencyShortcuts';

const POS = ({ onBack, startWithPopup  }) => {
        // Load initial state from localStorage or set to defaults
        const loadInitialState = (key, defaultValue) => {
            const saved = localStorage.getItem(key);
            if (saved !== null) {
                return JSON.parse(saved);
            }
            return defaultValue;
        };
    
     // States for events, selectedEvent, selectedPos, and popup visibility
     const [events, setEvents] = useState([
        { id: 1, name: 'Event A', numOfPos: 3 },
        { id: 2, name: 'Event B', numOfPos: 2 },
        // ... more events
    ]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedPos, setSelectedPos] = useState(null);
    const [showPopup, setShowPopup] = useState(startWithPopup);
    const [currentOrder, setCurrentOrder] = useState(() => loadInitialState('currentOrder', []));
    const [completedOrders, setCompletedOrders] = useState(() => loadInitialState('completedOrders', []));
    const [eventPosOrders, setEventPosOrders] = useState(() => loadInitialState('eventPosOrders', {}));
    const [receivedAmount, setReceivedAmount] = useState('');
    const [activeTab, setActiveTab] = useState('MENU');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info',
    });
    useEffect(() => {
        localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
    }, [currentOrder]);

    useEffect(() => {
        localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
    }, [completedOrders]);
    useEffect(() => {
        localStorage.setItem('eventPosOrders', JSON.stringify(eventPosOrders));
    }, [eventPosOrders]);
    // When the component mounts, if startWithPopup is true, show the selection popup
    useEffect(() => {
        if (startWithPopup) {
            setShowPopup(true);
        }
    }, [startWithPopup]);
    // When an event and POS is selected, load the corresponding data
    const handleSelection = (eventId, posId) => {
        const eventOrders = eventPosOrders[eventId] || {};
        const posOrders = eventOrders[posId] || { currentOrder: [], completedOrders: [] };
        
        // Set the current and completed orders for the selected POS
        setCurrentOrder(posOrders.currentOrder);
        setCompletedOrders(posOrders.completedOrders);

        // Update the selected event and POS states
        setSelectedEvent(eventId);
        setSelectedPos(posId);
        setShowPopup(false); // Close the popup after selection
    };

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
             // After completing an order, update the eventPosOrders with the new completed order
             setEventPosOrders(prev => ({
                ...prev,
                [selectedEvent]: {
                    ...prev[selectedEvent],
                    [selectedPos]: {
                        currentOrder: [],
                        completedOrders: [...(prev[selectedEvent]?.[selectedPos]?.completedOrders || []), newOrder],
                    },
                },
        }));
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
        // Convert current receivedAmount to number and add the shortcut amount
        const updatedAmount = (parseFloat(receivedAmount) || 0) + amount;
        setReceivedAmount(updatedAmount.toString());
      };
  
      return (
        <div className="pos">
          <Header
            onBack={onBack}
            onTabChange={handleTabChange}
            selectedEventName={events.find(event => event.id === selectedEvent)?.name}
            selectedPosId={selectedPos}
          />
          <OrderList
            className="order-list"
            orders={currentOrder}
            onOrderDeleted={handleOrderDeleted}
            receivedAmount={receivedAmount}
            change={calculateChange()}
          />
          {activeTab === 'MENU' && <Menu className="menu-grid" onAddToOrder={handleAddToOrder} />}
          {activeTab === 'ORDERS' && <Orders className="menu-grid" completedOrders={completedOrders} />}
          <Keypad className="keypad" onKeypadPress={handleKeypadPress} receivedAmount={receivedAmount} />
          <CurrencyShortcuts className="currency-shortcuts" onShortcutSelected={handleShortcutSelected} />
          {showPopup && (
            <SelectEventAndPosPopup
              events={events}
              onSelection={handleSelection}
              onClose={() => setShowPopup(false)}
            />
          )}
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
    };
    

export default POS