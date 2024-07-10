import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Paper, Typography, Card, CardContent, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchEvents, fetchEventPosOrders } from '@/app/apiService/apiEvent';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from 'chart.js';
import './DashboardContent.scss';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const DashboardContent = () => {
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventPosOrders, setEventPosOrders] = useState({});
  const [error, setError] = useState(null);
  const [view, setView] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedYear, setSelectedYear] = useState(moment().year());

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchEvents();
        const eventPosOrders = await fetchEventPosOrders();

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
        setEventPosOrders(eventPosOrders[0]?.ordersData || {});
      } catch (err) {
        setError(err.message);
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

        ongoingEvents.forEach(event => {
          if (eventPosOrders[event.title]) {
            Object.keys(eventPosOrders[event.title]).forEach(date => {
              if (moment(date).month() === selectedMonth && moment(date).year() === selectedYear && moment(date).date() === day) {
                Object.values(eventPosOrders[event.title][date]).forEach(pos => {
                  dailySales += pos.completedOrders.reduce((total, order) => total + parseFloat(order.total), 0);
                  dailyProfit += pos.completedOrders.reduce((total, order) => total + (parseFloat(order.total) - order.items.reduce((sum, item) => sum + parseFloat(item.costPrice) * item.quantity, 0)), 0);
                });
              }
            });
          }
        });

        salesData.push({ sales: dailySales, profit: dailyProfit });
      }
    } else if (view === 'yearly') {
      for (let month = 0; month < 12; month++) {
        labels.push(moment().month(month).format('MMMM'));
        let monthlySales = 0;
        let monthlyProfit = 0;

        ongoingEvents.forEach(event => {
          if (eventPosOrders[event.title]) {
            Object.keys(eventPosOrders[event.title]).forEach(date => {
              if (moment(date).month() === month && moment(date).year() === selectedYear) {
                Object.values(eventPosOrders[event.title][date]).forEach(pos => {
                  monthlySales += pos.completedOrders.reduce((total, order) => total + parseFloat(order.total), 0);
                  monthlyProfit += pos.completedOrders.reduce((total, order) => total + (parseFloat(order.total) - order.items.reduce((sum, item) => sum + parseFloat(item.costPrice) * item.quantity, 0)), 0);
                });
              }
            });
          }
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
        tension: 0.4, // Make the line curved
      },
      {
        label: 'Profit',
        data: salesData.map(data => data.profit),
        borderColor: '#FF6384',
        backgroundColor: 'rgba(0,255,0,0.1)',
        fill: true,
        tension: 0.4, // Make the line curved
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
                grid: {
                  display: false,
                },
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

               
