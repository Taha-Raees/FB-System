import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Finance.scss';
import POS from './POS/POS';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SalesAnalysis from './SalesAnalysis/SalesAnalysis';
import { Insights } from '@mui/icons-material';
import { fetchEventPosOrders, saveEventPosOrders } from '@/app/apiService/apiEvent';

const Finance = () => {
    const [currentView, setCurrentView] = useState('menu');
    const [eventPosOrders, setEventPosOrders] = useState({});

    // Fetch eventPosOrders from the backend
    const fetchEventPosOrdersFromBackend = async () => {
        try {
            const fetchedEventPosOrders = await fetchEventPosOrders();
            setEventPosOrders(fetchedEventPosOrders[0]?.ordersData || {});
        } catch (error) {
            console.error('Failed to fetch eventPosOrders:', error);
        }
    };

    useEffect(() => {
        fetchEventPosOrdersFromBackend();
    }, []);

    const renderView = () => {
        switch (currentView) {
            case 'POS':
                return (
                    <POS
                        onBack={() => setCurrentView('menu')}
                        startWithPopup
                        eventPosOrders={eventPosOrders}
                        setEventPosOrders={setEventPosOrders}
                    />
                );
            case 'Analysis':
                return (
                    <SalesAnalysis
                        onBack={() => setCurrentView('menu')}
                        eventPosOrders={eventPosOrders}
                    />
                );
            default:
                return renderMenu();
        }
    };

    const renderMenu = () => (
        <>
            {/* POS */}
            <Card variant="outlined" className="inventory-card" onClick={() => setCurrentView('POS')}>
                <CardContent>
                    <PointOfSaleIcon className="card-icon" />
                    <Typography variant="h5" component="h2">POS</Typography>
                    <Typography variant="body2">Custom POS for each truck & event</Typography>
                </CardContent>
            </Card>
            {/* Additional card for navigating to Sales Analysis */}
            <Card variant="outlined" className="inventory-card" onClick={() => setCurrentView('Analysis')}>
                <CardContent>
                    <Insights className="card-icon" />
                    <Typography variant="h5" component="h2">Sales Analysis</Typography>
                    <Typography variant="body2">View sales data across all events and POS</Typography>
                </CardContent>
            </Card>
        </>
    );

    return (
        <div className="inventory-page">
            {renderView()}
        </div>
    );
};

export default Finance;
