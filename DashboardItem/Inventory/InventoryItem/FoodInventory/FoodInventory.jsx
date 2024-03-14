import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Checkbox, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Grid, Typography,
  InputAdornment, CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import './FoodInventory.scss';
import BackButton from '@/Buttons/BackButton/BackButton';
import NewProduct from '@/Buttons/NewProductFood/NewProduct';
import { fetchFoodItems, addFoodItem, updateFoodItem, deleteFoodItem } from '@/app/apiService'; // Make sure these functions are defined
import { FilterList } from '@mui/icons-material';

const FoodInventory = ({ onBack }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingField, setEditingField] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const productCount = foodItems.length;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFoodItems();
        setFoodItems(data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
      setIsLoading(false);
    };
  
    fetchData();
  }, []);

  const handleAddProduct = async (newFoodItem) => {
    try {
        const foodItemToSend = {
            ...newFoodItem,
            quantity: parseInt(newFoodItem.quantity, 10) // Ensure quantity is an integer
        };
        const addedProduct = await addFoodItem(foodItemToSend);
        setFoodItems([...foodItems, addedProduct]);
        setShowProductModal(false);
    } catch (error) {
        console.error("Error adding food item:", error);
        console.error(error.response ? error.response.data : error.message);
    }
};

const handleEditChange = async (event, foodItemId, field) => {
  let newValue = event.target.value;
  // Check if the field is 'quantity' and convert newValue to an integer
  if (field === 'quantity') {
      newValue = parseInt(newValue, 10);
  }

  setFoodItems(foodItems.map(item => 
      item.id === foodItemId ? { ...item, [field]: newValue } : item
  ));
};


const saveChanges = async (foodItemId, field, newValue) => {
  try {
    // Check if the field is 'quantity' and convert newValue to an integer
    const valueToSend = field === 'quantity' ? parseInt(newValue, 10) : newValue;
    await updateFoodItem(foodItemId, { [field]: valueToSend });
    // If your API returns the updated object, you can update the state with it
  } catch (error) {
    console.error("Error updating food item:", error);
  }
};


  const handleEditKeyPress = (event, foodItemId, field) => {
    if (event.key === 'Enter') {
      const newValue = event.target.value;
      saveChanges(foodItemId, field, newValue);
      setEditingId(null);
      setEditingField('');
    }
  };

  const handleDeleteProduct = async (foodItemId) => {
    try {
      await deleteFoodItem(foodItemId);
      setFoodItems(foodItems.filter(item => item.id !== foodItemId));
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredFoodItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery) ||
    item.expiry.toLowerCase().includes(searchQuery)
  );

  const renderEditableCell = (text, foodItemId, field) => {
    return editingId === foodItemId && editingField === field ? (
      <TextField
        className="editable-cell-input"
        value={text}
        onChange={(event) => handleEditChange(event, foodItemId, field)}
        onKeyPress={(event) => handleEditKeyPress(event, foodItemId, field)}
        onBlur={() => { setEditingId(null); setEditingField(''); }} // Alternatively, you can call saveChanges here if you want to save on blur
        autoFocus
        size="small"
        fullWidth
        spellCheck={false}
      />
    ) : (
      <div onClick={() => { setEditingId(foodItemId); setEditingField(field); }}>
        {text}
      </div>
    );
  };

  return (
    <Grid container className="food-inventory" spacing={2}>
      <Grid item xs={12} className='controls'>
        <BackButton onBack={onBack} />
        <div className="inventory-controls">
          <div className="search-filter-section">
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton>
              <FilterList />
            </IconButton>
          </div>
          <div className="inventory-stats">
            <Typography variant="subtitle1">
              {`${foodItems.filter(item =>
                item.name.toLowerCase().includes(searchQuery) ||
                item.category.toLowerCase().includes(searchQuery) ||
                item.expiry.toLowerCase().includes(searchQuery)
              ).length} of ${foodItems.length} results`}
            </Typography>
          </div>
          <Button onClick={() => setShowProductModal(true)} startIcon={<AddIcon />}>
            New Food Item
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} className="inventory-table-container">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Expiry</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : foodItems.filter(item =>
                item.name.toLowerCase().includes(searchQuery) ||
                item.category.toLowerCase().includes(searchQuery) ||
                item.expiry.toLowerCase().includes(searchQuery)
              ).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.expiry}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteProduct(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {!isLoading && foodItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">No food items found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      
      {showProductModal && (
        <NewProduct
          open={showProductModal}
          onClose={() => { setShowProductModal(false); setEditingProduct(null); }}
          onAddProduct={handleAddProduct}
          product={editingProduct}
        />
      )}
    </Grid>
  );
  
};

export default FoodInventory;
