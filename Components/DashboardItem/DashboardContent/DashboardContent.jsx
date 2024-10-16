"use client"
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Paper, Typography, Card, CardContent, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchEvents, fetchEventPosOrders } from '@/app/apiService/apiEvent';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from 'chart.js';
import './DashboardContent.scss';
import LoadingOverlay from '@/Components/ui/LoadingOverlay/LoadingOverlay';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const DashboardContent = () => {
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventPosOrders, setEventPosOrders] = useState({});
  const [error, setError] = useState(null);
  const [view, setView] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchEvents();
        const posOrders = await fetchEventPosOrders();
        console.log('Fetched Events:', events);
        console.log('Fetched Event POS Orders:', posOrders);

        const currentDate = new Date();
        const ongoing = events.filter(event =>
          new Date(event.startDate) <= currentDate && new Date(event.endDate) >= currentDate
        );

        const upcoming = events
          .filter(event => new Date(event.startDate) > currentDate)
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); // Sort upcoming events by start date

        const earliestUpcomingDate = upcoming.length > 0 ? upcoming[0].startDate : null;
        const earliestUpcomingEvents = upcoming.filter(event => event.startDate === earliestUpcomingDate);

        setOngoingEvents(ongoing);
        setUpcomingEvents(earliestUpcomingEvents);
        setEventPosOrders(posOrders[0]?.ordersData || {});
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const calculateSalesData = () => {
    const salesData = [];
    const labels = [];
  
    if (view === 'monthly') {
      for (let day = 1; day <= moment(selectedYear, 'YYYY').month(selectedMonth).daysInMonth(); day++) {
        labels.push(day);
        let dailySales = 0;
        let dailyProfit = 0;
  
        Object.keys(eventPosOrders).forEach(eventTitle => {
          
          Object.keys(eventPosOrders[eventTitle]).forEach(date => {
            const orderDate = moment(date);
            
            if (orderDate.month() === selectedMonth && orderDate.year() === selectedYear && orderDate.date() === day) {
              Object.values(eventPosOrders[eventTitle][date]).forEach(pos => {
                pos.completedOrders.forEach(order => {
                  
                  dailySales += parseFloat(order.total);
                  const orderProfit = parseFloat(order.total) - order.items.reduce((sum, item) => sum + parseFloat(item.costPrice) * item.quantity, 0);
                  dailyProfit += orderProfit;
                  
                });
              });
            }
          });
        });
  
        salesData.push({ sales: dailySales, profit: dailyProfit });
        
      }
    } else if (view === 'yearly') {
      for (let month = 0; month < 12; month++) {
        labels.push(moment().month(month).format('MMMM'));
        let monthlySales = 0;
        let monthlyProfit = 0;
  
        Object.keys(eventPosOrders).forEach(eventTitle => {
         
          Object.keys(eventPosOrders[eventTitle]).forEach(date => {
            const orderDate = moment(date);
            
            if (orderDate.month() === month && orderDate.year() === selectedYear) {
              Object.values(eventPosOrders[eventTitle][date]).forEach(pos => {
                pos.completedOrders.forEach(order => {
                  
                  monthlySales += parseFloat(order.total);
                  const orderProfit = parseFloat(order.total) - order.items.reduce((sum, item) => sum + parseFloat(item.costPrice) * item.quantity, 0);
                  monthlyProfit += orderProfit;
                  
                });
              });
            }
          });
        });
  
        salesData.push({ sales: monthlySales, profit: monthlyProfit });
       
      }
    }
  
    
    return { labels, salesData };
  };
  

  const { labels, salesData } = calculateSalesData();
  const salesChartData = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: salesData.map(data => data.sales),
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(0,0,255,0.1)',
        fill: true,
        tension: 0.2,
      },
      {
        label: 'Profit',
        data: salesData.map(data => data.profit),
        borderColor: '#FF6384',
        backgroundColor: 'rgba(0,255,0,0.1)',
        fill: true,
        tension: 0.2,
      },
    ],
  };

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="DashboardContents">
      {loading && <LoadingOverlay />}
      {error && <Typography color="error">{error}</Typography>}

      <div className="events-row">
        <Card className="events-section" elevation={3}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Ongoing Events</Typography>
            {ongoingEvents.length === 0 ? (
              <Typography variant="body1">No ongoing events.</Typography>
            ) : (
              <List>
                {ongoingEvents.map(event => (
                  <ListItem key={event.id}>
                    <ListItemText 
                      primary={event.title} 
                      secondary={`Location: ${event.location} | ${moment(event.startDate).format('MMMM D, YYYY')} - ${moment(event.endDate).format('MMMM D, YYYY')}`} 
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>

        <Card className="events-section" elevation={3}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Upcoming Events</Typography>
            {upcomingEvents.length === 0 ? (
              <Typography variant="body1">No upcoming events.</Typography>
            ) : (
              <List>
                {upcomingEvents.map(event => (
                  <ListItem key={event.id}>
                    <ListItemText 
                      primary={event.title} 
                      secondary={`Location: ${event.location} | ${moment(event.startDate).format('MMMM D, YYYY')} - ${moment(event.endDate).format('MMMM D, YYYY')}`} 
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="chart-section">
        <div className="controls">
          <FormControl>
            <InputLabel id="view-select-label">View</InputLabel>
            <Select
              labelId="view-select-label"
              id="view-select"
              value={view}
              onChange={handleViewChange}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>

          {view === 'monthly' && (
            <FormControl>
              <InputLabel id="month-select-label">Month</InputLabel>
              <Select
                labelId="month-select-label"
                id="month-select"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                {Array.from({ length: 12 }, (_, index) => (
                  <MenuItem key={index} value={index}>
                    {moment().month(index).format('MMMM')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <MenuItem key={index} value={moment().year() - index}>
                  {moment().year() - index}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Paper elevation={3} className="sales-chart">
          <Typography variant="h6">
            Sales and Profit for {view === 'monthly' ? moment().month(selectedMonth).format('MMMM') : ''} {selectedYear}
          </Typography>
          <Line data={salesChartData} options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `${tooltipItem.dataset.label}: €${tooltipItem.raw.toFixed(2)}`,
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          }} />
        </Paper>
      </div>
    </div>
  );
};

export default DashboardContent;
