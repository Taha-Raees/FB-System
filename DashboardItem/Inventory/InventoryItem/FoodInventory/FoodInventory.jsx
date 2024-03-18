import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Checkbox, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Grid, Typography,
  InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Select, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import './FoodInventory.scss';
import BackButton from '@/Buttons/BackButton/BackButton';
import NewProduct from '@/Buttons/NewProductFood/NewProduct';
import { fetchFoodItems, addFoodItem, updateFoodItem, deleteFoodItem, fetchSuppliers } from '@/app/apiServiceFood';

import { FilterList, MoreHoriz } from '@mui/icons-material';
import ItemDetails from '@/Buttons/ItemDetails';


const FoodInventory = ({ onBack }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingField, setEditingField] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const productCount = foodItems.length;
  const [isLoading, setIsLoading] = useState(false); // initialize loading state
  const [suppliers, setSuppliers] = useState([]);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  
  // Fetch suppliers on component mount
  useEffect(() => {
    const fetchAllSuppliers = async () => {
      try {
        const suppliersData = await fetchSuppliers();
        setSuppliers(suppliersData);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchAllSuppliers();
  }, []);

  // Function to open item details popup
  const openItemDetails = (item) => {
    setSelectedItemDetails(item);
  };

  // Function to close item details popup
  const closeItemDetails = () => {
    setSelectedItemDetails(null);
  };
  useEffect(() => {
    setIsLoading(true); // start loading
    const fetchData = async () => {
      try {
        const data = await fetchFoodItems();
        setFoodItems(data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      } finally {
        setIsLoading(false); // stop loading regardless of the result
      }
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
  // If the field is 'quantity' and the newValue is not empty, convert to an integer
  if (field === 'quantity' && newValue) {
    newValue = parseInt(newValue, 10);
    // If newValue is an empty string, do not convert to number to prevent NaN
    if (isNaN(newValue)) {
      newValue = ''; // Set it to an empty string or some default value like 0
    }
  }

  setFoodItems(foodItems.map(item =>
    item.id === foodItemId ? { ...item, [field]: newValue } : item
  ));
};
  const saveItemDetails = async (updatedItem) => {
    try {
      // Assuming `updateFoodItem` is an API call that updates the item on your backend
      const result = await updateFoodItem(updatedItem.id, updatedItem);
  
      // Update the local state with the updated item
      // This assumes that `result` is the updated item; adjust according to your API response
      setFoodItems(foodItems.map(item => item.id === updatedItem.id ? {...item, ...result} : item));
  
      // Close the item details dialog
      closeItemDetails();
    } catch (error) {
      console.error("Error updating food item:", error);
    }
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
  const handleMoreHorizClick = (item) => {
    openItemDetails(item); // Open the dialog with the details of the clicked item
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
              <FilterList/>
            </IconButton>
          </div>
          <div className="inventory-stats">
            <Typography variant="subtitle1">
              {`${filteredFoodItems.length} of ${productCount} results`}
            </Typography>
          </div>
          <Button className='new-product-button' onClick={() => setShowProductModal(true)} startIcon={<AddIcon />}>
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
      <TableCell colSpan={6} align="center">
        <CircularProgress  sx={{  color: '#ff9c2a' }}/>
      </TableCell>
    </TableRow>
  ) : (filteredFoodItems.length > 0 ? (
    filteredFoodItems.map((item) => (
      <TableRow key={item.id}>
                  <TableCell>
                    {renderEditableCell(item.name, item.id, 'name')}
                  </TableCell>
                  <TableCell>
                    {renderEditableCell(item.category, item.id, 'category')}
                  </TableCell>
                   <TableCell>
                    {renderEditableCell(item.quantity, item.id, 'quantity')}
                  </TableCell>
                  <TableCell>
                    {renderEditableCell(item.expiry, item.id, 'expiry')}
                  </TableCell>
                 
                  <TableCell>
                    <IconButton onClick={() => handleDeleteProduct(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleMoreHorizClick(item)}>
                      <MoreHoriz/>
                    </IconButton>
                  </TableCell>
                  </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} align="center">No items found</TableCell>
    </TableRow>
  ))}
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
      {selectedItemDetails && (
         <ItemDetails
         open={Boolean(selectedItemDetails)}
         onClose={closeItemDetails}
         item={selectedItemDetails || {}}
         onSave={saveItemDetails}
       />
      )}
    </Grid>
  );
  
};

export default FoodInventory;
