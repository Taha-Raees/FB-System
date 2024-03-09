import React, { useState } from 'react';
import { Button, TextField, Checkbox, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import './EquipmentInventory.scss';
import BackButton from '@/Buttons/BackButton/BackButton';
import NewProduct from '@/Buttons/NewProductFood/NewProduct';

const EquipmentInventory = ({ onBack }) => {
  // Initial products list
  const [products, setProducts] = useState([
    { id: 1, name: 'Buns&Sons',category:"Roadrunner", description: 'Beef Burger and Pulled Pork', Maintenance: '2022-12-31' },
        { id: 2, name: 'Brenwerk',category:"XXL", description: 'Currywurst', Maintenance: '2023-01-15' },
        { id: 3, name: 'AsiaBox',category:"Roadrunner", description: 'Noodles', Maintenance: '2022-08-10' }
  ]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const productCount = products.length;
  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Math.max(...products.map(p => p.id)) + 1 }]);
    setShowProductModal(false);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery) ||
    product.description.toLowerCase().includes(searchQuery)
    // Add more fields to filter by if needed
  );

  return (
    <Grid container className="equipment-inventory" spacing={2}>
      <Grid item xs={12}>
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
              {`${productCount} of ${productCount} results`}
            </Typography>
          </div>
          <div>
      <Button onClick={() => setShowProductModal(true)} startIcon={<AddIcon />}>New Product</Button>
      
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
              <TableCell>Description</TableCell>
              <TableCell>Maintenance</TableCell>
              <TableCell>Actions</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
        <TableRow key={product.id}>
        <TableCell padding="checkbox">
          <Checkbox />
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.category}</TableCell>
        <TableCell>{product.description}</TableCell>
        <TableCell>{product.Maintenance}</TableCell>
        <TableCell>
          <IconButton onClick={() => openEditModal(product)}><EditIcon /></IconButton>
          <IconButton onClick={() => handleDeleteProduct(product.id)}><DeleteIcon /></IconButton>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={7} align="center">No items found</TableCell>
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

export default EquipmentInventory;
