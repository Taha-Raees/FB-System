import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './Orders.scss';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Orders = ({ completedOrders }) => {
  
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    // Calculate the total sales and item quantities across all orders
    const totalSales = completedOrders.reduce((acc, order) => acc + parseFloat(order.total), 0).toFixed(2);
    
    // Create an object to hold the total quantities for each item
    const itemTotals = completedOrders.flatMap(order => order.items).reduce((acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + item.quantity;
        return acc;
    }, {});
    const handleClickOpen = (order) => {
        setSelectedOrder(order);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <div className="menu-grid">
        
            <TableContainer component={Paper} className='table-container' >
            <div className="summary-container">
                <h2>Total Sales: €{totalSales}</h2>
                <div className="item-totals">
                    {Object.entries(itemTotals).map(([itemName, quantity]) => (
                        <p key={itemName}>{itemName}: {quantity}</p>
                    ))}
                </div>
            </div>
            <Table aria-label="completed orders table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell align="right">Time</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {completedOrders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell component="th" scope="row">
                                {order.id}
                            </TableCell>
                            <TableCell align="right">{order.timestamp.toLocaleString()}</TableCell>
                            <TableCell align="right">€{order.total}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={() => handleClickOpen(order)}
                                >
                                    <MoreHorizIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {/* Dialog for order details */}
        <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
            {selectedOrder && (
                <List dense>
                    <ListItem>
                        <ListItemText primary={`Order ID: ${selectedOrder.id}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Time: ${selectedOrder.timestamp.toLocaleString()}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Total: €${selectedOrder.total}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Received: €${selectedOrder.received}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Change: €${selectedOrder.change}`} />
                    </ListItem>
                    {selectedOrder.items.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`${item.quantity} x ${item.name} @ €${item.price.toFixed(2)}`} />
                        </ListItem>
                    ))}
                </List>
            )}
        </DialogContent>
    </Dialog></div>
    );
};

export default Orders;
