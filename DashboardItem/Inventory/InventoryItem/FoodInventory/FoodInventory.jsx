import React from 'react';
import {
  Button, TextField, Card, Checkbox, IconButton, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import './FoodInventory.scss';
import BackButton from '@/Buttons/BackButton/BackButton';

const FoodInventory = ({ onBack }) => {
    const products = [
        { id: 1, name: 'Apple Juice',category:"Drink", quantity: 24, description: 'Bottled apple juice', expiry: '2022-12-31' },
        { id: 2, name: 'Orange Juice',category:"Drink", quantity: 30, description: 'Bottled orange juice', expiry: '2023-01-15' },
        { id: 3, name: 'Milk',category:"Drink", quantity: 10, description: 'Fresh milk', expiry: '2022-08-10' }
      ];

  // Replace with dynamic logic as needed
  const productCount = products.length;

  return (
    <Grid container className="food-inventory" spacing={2}>
      <Grid item xs={12}>
      <BackButton onBack={onBack} />
        <div className="inventory-controls">
          <div className="search-filter-section">
            <SearchIcon />
            <TextField
              label="Search"
              variant="outlined"
              size="small"
            />
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </div>
          <div className="inventory-stats">
            <Typography variant="subtitle1">
              {`${productCount} of ${productCount} results`}
            </Typography>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              New Product
            </Button>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} className="inventory-table-container">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.expiry}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default FoodInventory;

