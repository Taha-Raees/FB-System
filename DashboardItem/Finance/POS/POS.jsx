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
import { fetchEvents, saveEventPosOrders } from '@/app/apiService/apiEvent';
import moment from 'moment';

const POS = ({ onBack, startWithPopup, eventPosOrders, setEventPosOrders }) => {
    const [events, setEvents] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info',
    });

    const fetchEventsFromAPI = async () => {
        try {
            const fetchedEvents = await fetchEvents(); // Assuming fetchEvents is imported
            setEvents(fetchedEvents);
        } catch (error) {
            console.error('Failed to fetch events:', error);
            showSnackbar('Failed to fetch events', 'error');
        }
    };

    useEffect(() => {
        fetchEventsFromAPI();
    }, []);

    const [selectedEvent, setSelectedEvent] = useState({ id: null, title: '' });
    const [selectedPos, setSelectedPos] = useState(null);
    const [showPopup, setShowPopup] = useState(startWithPopup);
    const [currentOrder, setCurrentOrder] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [receivedAmount, setReceivedAmount] = useState('');
    const [activeTab, setActiveTab] = useState('MENU');

    // When an event and POS is selected, load the corresponding data
    const handleSelection = (eventId, posId) => {
        const currentDate = moment().format('YYYY-MM-DD'); // Use current date for order data
        const eventOrders = eventPosOrders[eventId] || {};
        const posOrders = eventOrders[currentDate] ? eventOrders[currentDate][posId] || { currentOrder: [], completedOrders: [] } : { currentOrder: [], completedOrders: [] };
        const event = events.find(event => event.id === eventId);

        // Set the current and completed orders for the selected POS and date
        setCurrentOrder(posOrders.currentOrder);
        setCompletedOrders(posOrders.completedOrders);

        // Update the selected event and POS states
        setSelectedEvent({ id: eventId, title: event?.title });
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

    const handleOrderCompleted = async () => {
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

            const currentDate = moment().format('YYYY-MM-DD'); // Use current date for order data

            // After completing an order, update the eventPosOrders with the new completed order
            const updatedEventPosOrders = {
                ...eventPosOrders,
                [selectedEvent.title]: {
                    ...eventPosOrders[selectedEvent.title],
                    [currentDate]: {
                        ...eventPosOrders[selectedEvent.title]?.[currentDate],
                        [selectedPos]: {
                            currentOrder: [],
                            completedOrders: [
                                ...(eventPosOrders[selectedEvent.title]?.[currentDate]?.[selectedPos]?.completedOrders || []),
                                newOrder
                            ],
                        },
                    },
                },
            };

            setEventPosOrders(updatedEventPosOrders);

            // Save the updated eventPosOrders to the backend
            try {
                await saveEventPosOrders(updatedEventPosOrders);
                showSnackbar('Event POS orders saved successfully', 'success');
            } catch (error) {
                showSnackbar('Failed to save Event POS orders', 'error');
            }
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
            selectedEventName={selectedEvent.title}
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
          {activeTab === 'ORDERS' && <Orders className="menu-grid" completedOrders={completedOrders} setCompletedOrders={setCompletedOrders} />}
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