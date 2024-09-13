import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Select, MenuItem, FormControl, InputLabel, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import './SalesAnalysis.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import BackButton from '@/Components/ui/Buttons/BackButton/BackButton';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const SalesAnalysis = ({ eventPosOrders, onBack }) => {
    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedDate, setSelectedDate] = useState('all'); // 'all' for all dates

    const eventOptions = Object.keys(eventPosOrders).map(eventId => ({ id: eventId, name: eventId }));

    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value);
        setSelectedDate('all'); // Reset date selection on event change
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    let totalSales = 0;
    let itemQuantities = {};
    let posData = [];

    if (eventPosOrders[selectedEvent]) {
        const eventDates = selectedDate === 'all'
            ? Object.keys(eventPosOrders[selectedEvent])
            : [selectedDate];

        const posArray = eventDates.flatMap(date => Object.entries(eventPosOrders[selectedEvent][date] || {}).map(([posId, pos]) => ({ ...pos, posId })));

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

                posData.push({
                    posId:`POS-${pos.posId}` ,
                    totalSales: posTotalSales,
                    totalCost: pos.completedOrders.reduce((total, order) => total + order.items.reduce((subTotal, item) => subTotal + (item.costPrice * item.quantity), 0), 0),
                    profit: posTotalSales - pos.completedOrders.reduce((total, order) => total + order.items.reduce((subTotal, item) => subTotal + (item.costPrice * item.quantity), 0), 0)
                });
            }
        });
    }

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

    const dateOptions = selectedEvent ? ['all', ...Object.keys(eventPosOrders[selectedEvent])] : [];

    return (
        <Grid container spacing={2} className="sales-analysis">
            <Grid item xs={12}>
                <Paper className='menu-bar'>
                    <BackButton onBack={onBack} />
                    <FormControl className='menu' fullWidth margin="normal">
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
                    {selectedEvent && (
                        <FormControl className='menu' fullWidth margin="normal">
                            <InputLabel id="date-select-label">Select Date</InputLabel>
                            <Select
                                labelId="date-select-label"
                                id="date-select"
                                value={selectedDate}
                                label="Select Date"
                                onChange={handleDateChange}
                            >
                                {dateOptions.map(date => (
                                    <MenuItem key={date} value={date}>{date === 'all' ? 'All Dates' : date}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
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
