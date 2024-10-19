"use client"
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Typography, Card, CardContent, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem, Grid, Box, Paper } from '@mui/material';
import { fetchEvents, fetchEventPosOrders } from '@/app/apiService/apiEvent';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, ArcElement } from 'chart.js';
import './DashboardContent.scss';
import LoadingOverlay from '@/Components/ui/LoadingOverlay/LoadingOverlay';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, ArcElement);

const DashboardContent = () => {
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventPosOrders, setEventPosOrders] = useState({});
  const [error, setError] = useState(null);
  const [view, setView] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [loading, setLoading] = useState(true);
  const [topSellingItems, setTopSellingItems] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const cachedData = JSON.parse(localStorage.getItem('dashboardData'));
        const lastUpdated = localStorage.getItem('lastUpdated');
        const currentTime = new Date().getTime();

        // Check if data is cached and not older than 1 hour
        if (cachedData && lastUpdated && (currentTime - lastUpdated < 3600000)) {
          setOngoingEvents(cachedData.ongoingEvents);
          setUpcomingEvents(cachedData.upcomingEvents);
          setEventPosOrders(cachedData.eventPosOrders);
          setTotalRevenue(cachedData.totalRevenue);
          setTotalProfit(cachedData.totalProfit);
          setTopSellingItems(cachedData.topSellingItems);
          setLoading(false);
        } else {
          const events = await fetchEvents();
          const posOrders = await fetchEventPosOrders();
          const currentDate = new Date();
          const ongoing = events.filter(event =>
            new Date(event.startDate) <= currentDate && new Date(event.endDate) >= currentDate
          );

          const upcoming = events
            .filter(event => new Date(event.startDate) > currentDate)
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

          let revenue = 0;
          let profit = 0;
          const itemSales = {};

          Object.values(posOrders[0]?.ordersData || {}).forEach(dateData => {
            Object.values(dateData).forEach(posData => {
              Object.values(posData).forEach(orders => {
                orders.completedOrders.forEach(order => {
                  revenue += parseFloat(order.total);
                  order.items.forEach(item => {
                    profit += (parseFloat(item.price) - parseFloat(item.costPrice)) * item.quantity;
                    itemSales[item.name] = (itemSales[item.name] || 0) + item.quantity;
                  });
                });
              });
            });
          });

          const topItems = Object.entries(itemSales).sort((a, b) => b[1] - a[1]).slice(0, 5);

          setOngoingEvents(ongoing);
          setUpcomingEvents(upcoming);
          setEventPosOrders(posOrders[0]?.ordersData || {});
          setTotalRevenue(revenue);
          setTotalProfit(profit);
          setTopSellingItems(topItems);

          // Cache data
          localStorage.setItem('dashboardData', JSON.stringify({
            ongoingEvents: ongoing,
            upcomingEvents: upcoming,
            eventPosOrders: posOrders[0]?.ordersData || {},
            totalRevenue: revenue,
            totalProfit: profit,
            topSellingItems: topItems,
          }));
          localStorage.setItem('lastUpdated', currentTime);

          setLoading(false);
        }
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

  const topSellingItemsChartData = {
    labels: topSellingItems.map(item => item[0]),
    datasets: [
      {
        data: topSellingItems.map(item => item[1]),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const { labels, salesData } = calculateSalesData();
  const salesChartData = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: salesData.map(data => data.sales),
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Profit',
        data: salesData.map(data => data.profit),
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
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
    <Box className="DashboardContents">
      {loading && <LoadingOverlay />}
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={3}>
        {/* Financial Summary Card */}
        <Grid item xs={12} md={4}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>Financial Summary</Typography>
              <Typography variant="body1">Total Revenue: €{totalRevenue.toFixed(2)}</Typography>
              <Typography variant="body1">Total Profit: €{totalProfit.toFixed(2)}</Typography>
              <Typography variant="body1">Profit Margin: {totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(2) : 0}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Selling Items Card */}
        <Grid item xs={12} md={4}>
          <Card className="top-selling-items">
            <CardContent>
              <Typography variant="h6" gutterBottom>Top Selling Items</Typography>
              <Doughnut 
                data={topSellingItemsChartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      align: 'center',
                      labels: {
                        font: {
                          size: 10, // Reduce font size for legend
                        },
                      }
                    }
                  }
                }} 
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Event Overview Card */}
        <Grid item xs={12} md={4}>
          <Card className="event-overview">
            <CardContent>
              <Typography variant="h6" gutterBottom>Ongoing Events</Typography>
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

              <Typography variant="h6" gutterBottom>Upcoming Events</Typography>
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
        </Grid>
       
        {/* Chart Section */}
        <Grid item xs={12}>
          <Card className="chart-section">
            <CardContent>
              <Box className="controls">
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
              </Box>

              <Typography variant="h6" gutterBottom>
                Sales and Profit for {view === 'monthly' ? moment().month(selectedMonth).format('MMMM') : ''} {selectedYear}
              </Typography>

              <div style={{ padding: '8px', borderRadius: '8px', height: '300px' ,backgroundColor:'transparent' }}> {/* Set a fixed height */}
                <Box className="sales-chart" style={{ height: '100%' }}>
                  <Line data={salesChartData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'top',
                        labels: {
                          font: {
                            size: 10, // Reduce font size for legend
                          },
                        },
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
                        ticks: {
                          font: {
                            size: 10, // Reduce font size for x-axis labels
                          },
                        },
                      },
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: '#e0e0e0', // Light grid color for better visibility
                        },
                        ticks: {
                          font: {
                            size: 10, // Reduce font size for y-axis labels
                          },
                        },
                      },
                    },
                  }} />
                </Box>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
