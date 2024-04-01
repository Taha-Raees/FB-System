import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '@/app/apiService/apiService';
import {
  Button, TextField, Checkbox, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Grid, Typography,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import './TruckInventory.scss';
import BackButton from '@/Buttons/BackButton/BackButton';
import NewProduct from '@/Buttons/NewProductTruck/NewProduct';
import { CircularProgress } from '@mui/material';

const TruckInventory = ({ onBack }) => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingField, setEditingField] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const productCount = products.length;
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading before fetching data
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetching data
      }
    }; fetchData();
  }, []);
 // Initialize the loading state as true  
  // Add a new product
    const handleAddProduct = async (newProduct) => {
      try {
        const addedProduct = await addProduct(newProduct);
        setProducts([...products, addedProduct]);
        setShowProductModal(false);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    };

    // Update a product
    const handleEditProduct = async (product) => {
      try {
        const updatedProduct = await updateProduct(product.id, product);
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        setShowProductModal(false);
        setEditingId(null);
        setEditingProduct(null);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    };

  // Delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handlers for inline editing
 // Assuming the existence of the updateProduct function as you described.

// Handlers for inline editing
const handleEditChange = (event, productId, field) => {
  const newValue = event.target.value;
  setProducts(products.map(p => p.id === productId ? { ...p, [field]: newValue } : p));
};

const saveChanges = async (productId, field, newValue) => {
  try {
    const updatedProduct = await updateProduct(productId, { [field]: newValue });
    setProducts(products.map(p => p.id === productId ? { ...p, ...updatedProduct } : p));
    // Optionally, refresh your products list from the backend to ensure consistency.
  } catch (error) {
    console.error("Error updating product:", error);
    // Handle the error, e.g., show an error message to the user.
  }
};

const handleEditKeyPress = (event, productId, field) => {
  if (event.key === 'Enter') {
    const newValue = event.target.value;
    saveChanges(productId, field, newValue);
    setEditingId(null);
    setEditingField('');
  }
};

const handleEditBlur = (event, productId, field) => {
  const newValue = event.target.value;
  saveChanges(productId, field, newValue);
  setEditingId(null);
  setEditingField('');
};

// Render function and other component logic remains the same.


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery) ||
    product.description.toLowerCase().includes(searchQuery)
    // Add more fields to filter by if needed
  );

  const renderEditableCell = (text, productId, field) => {
    if (editingId === productId && editingField === field) {
      return (
        <TextField
        className="editable-cell-input"
          value={text}
          onChange={(event) => handleEditChange(event, productId, field)}
          onKeyPress={(event) => handleEditKeyPress(event, productId, field)}
          onBlur={handleEditBlur}
          autoFocus
          size="small"
          fullWidth
          spellCheck={false}
        />
      );
    }
    return text;
  };


  return (
    <Grid container className="truck-inventory" spacing={2}>
      <Grid className='controls' item xs={12}>
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
              <FilterListIcon />
            </IconButton>
          </div>
          <div className="inventory-stats">
            <Typography variant="subtitle1">
              {`${filteredProducts.length} of ${productCount} results`}
            </Typography>
          </div>
          <div>
      <Button  className='new-product-button ' onClick={() => setShowProductModal(true)} startIcon={<AddIcon />}>New Product</Button>
      
      </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} className="inventory-table-container">
          <Table stickyHeader>
          <TableHead>
          <TableRow>
                
                <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
          {isLoading ? (
                <TableRow  >
                  <TableCell colSpan={5} sx={{ backgroundColor: 'transparent', textAlign: 'center', color: 'grey.500' }}>
                    <CircularProgress sx={{  color: '#ff9c2a' }} /> {/* Render loading indicator while data is fetching */}
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                   
                    <TableCell onClick={() => { setEditingId(product.id); setEditingField('name'); }}>
                      {renderEditableCell(product.name, product.id, 'name')}
                    </TableCell>
                    <TableCell onClick={() => { setEditingId(product.id); setEditingField('category'); }}>
                      {renderEditableCell(product.category, product.id, 'category')}
                    </TableCell>
                    <TableCell onClick={() => { setEditingId(product.id); setEditingField('description'); }}>
                      {renderEditableCell(product.description, product.id, 'description')}
                    </TableCell>
                    <TableCell>
                     <IconButton onClick={() => handleDeleteProduct(product.id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No items found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      
      <NewProduct
  open={showProductModal}
  onClose={() => { setShowProductModal(false); setEditingProduct(null); }}
  onAddProduct={editingProduct ? handleEditProduct : handleAddProduct} // Ensure correct function is passed
  product={editingProduct}
/>
    </Grid>
  );
};

export default TruckInventory;