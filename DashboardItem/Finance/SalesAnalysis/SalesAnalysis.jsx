import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Select, MenuItem, FormControl, InputLabel, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import './SalesAnalysis.scss'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import BackButton from '@/Buttons/BackButton/BackButton';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const SalesAnalysis = ({ eventPosOrders,onBack }) => {
    const [selectedEvent, setSelectedEvent] = useState('');

    // Function to get event options for select dropdown
  
  const eventOptions = Object.keys(eventPosOrders).map(eventId => ({ id: eventId, name: eventId }));
    // Handle event selection change
    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value);
    };

    // Calculate total sales and item quantities for the selected event
    let totalSales = 0;
let itemQuantities = {};

if (eventPosOrders[selectedEvent]) {
  const posArray = Object.values(eventPosOrders[selectedEvent]);
  
  posArray.forEach(pos => {
    if (pos && pos.completedOrders) {
      const posTotalSales = pos.completedOrders.reduce((total, order) => total + parseFloat(order.total), 0);
      totalSales += posTotalSales;

      const quantities = pos.completedOrders.flatMap(order => order.items).reduce((acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + item.quantity;
        return acc;
      }, {});
      
      Object.entries(quantities).forEach(([name, quantity]) => {
        itemQuantities[name] = (itemQuantities[name] || 0) + quantity;
      });
    }
  });
}
    const posData = selectedEvent && eventPosOrders[selectedEvent] ? 
    Object.values(eventPosOrders[selectedEvent]).map((pos, index) => { // Adding index for fallback
        const totals = pos.completedOrders.reduce((acc, order) => {
            const orderTotalSales = order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
            const orderTotalCost = order.items.reduce((total, item) => total + (item.costPrice * item.quantity), 0);
            acc.sales += orderTotalSales;
            acc.cost += orderTotalCost;
            return acc;
        }, { sales: 0, cost: 0 });

        // Ensure posId is correctly assigned
        const posId = pos.posId || `POS-${index + 1}`; // Fallback to a generated ID if posId is undefined

        return {
            posId, // Use the ensured posId here
            totalSales: totals.sales,
            totalCost: totals.cost,
            profit: totals.sales - totals.cost,
        };
    }) : [];

// If `totalCost` and `totalSales` are meant to be aggregated for all POS under an event
const totalEventSales = posData.reduce((acc, curr) => acc + curr.totalSales, 0);
const totalEventCost = posData.reduce((acc, curr) => acc + curr.totalCost, 0);
const totalEventProfit = posData.reduce((acc, curr) => acc + curr.profit, 0);


    const salesData = {
        labels: posData.map(data => data.posId), 
        datasets: [{
            data: posData.map(data => data.totalSales),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0', '#637aff', '#aaff63', '#63ffda', '#ff63ed', '#ff8963'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0', '#637aff', '#aaff63', '#63ffda', '#ff63ed', '#ff8963'],
            label: 'Sales by POS',
        }]
    };

    // Customize tooltip to show sales, cost, and profit
    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const pos = posData[context.dataIndex];
                        return `Sales: €${pos.totalSales.toFixed(2)}`;
                    },
                    afterLabel: function(context) {
                        const pos = posData[context.dataIndex];
                        return [
                            `Cost: €${pos.totalCost.toFixed(2)}`,
                            `Profit: €${pos.profit.toFixed(2)}`
                        ];
                    }
                }
            }
        }
    };

    return (
        <Grid container spacing={2} className="sales-analysis">
            <Grid  item xs={12}>
                <Paper className='menu-bar'>
                <BackButton  onBack={onBack} />
                    <FormControl  className='menu'fullWidth margin="normal">
                    <InputLabel id="event-select-label">Select Event</InputLabel>
                    <Select
                        labelId="event-select-label"
                        id="event-select"
                        value={selectedEvent}
                        label="Select Event"
                        onChange={handleEventChange}
                    >
                        {eventOptions.map(option => (
                            <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
    <Paper>
        <List>
            <ListItem>
                <ListItemText 
                primaryTypographyProps={{ className: 'list-total-heading' }}  
                primary={`Total Sales: €${totalEventSales.toFixed(2)}`}
                secondary={`Total Cost: €${totalEventCost.toFixed(2)}, Profit: €${totalEventProfit.toFixed(2)}`}    
                />
            </ListItem>
            {Object.entries(itemQuantities).map(([name, quantity]) => (
                <ListItem className="list-item" key={name}>
                    <ListItemText primary={`${name}: ${quantity}`} />
                </ListItem>
            ))}
        </List>
    </Paper>
</Grid>
            {selectedEvent && (
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">Item Distribution for Selected Event</Typography>
                            <Doughnut data={salesData} options={options} />
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    );
};

export default SalesAnalysis;
