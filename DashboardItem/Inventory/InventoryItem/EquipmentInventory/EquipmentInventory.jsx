import React, { useState, useEffect } from 'react';
import { fetchequipments, addequipment, updateequipment, deleteequipment } from '@/app/apiService/apiService';
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
import './EquipmentInventory.scss';
import BackButton from '@/Buttons/BackButton/BackButton';
import NewProduct from '@/Buttons/NewProductEquipment/NewProduct';
import { CircularProgress } from '@mui/material';


const EquipmentInventory = ({ onBack }) => {
  const [equipments, setEquipments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingField, setEditingField] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New state for loading indicator

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentsData = await fetchequipments();
        setEquipments(equipmentsData);
        setIsLoading(false); // End loading
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // End loading even if there is an error
      }
    };

    fetchData();
  }, []);


  // Adjusted handleAddProduct to ensure quantity is an integer
const handleAddProduct = async (newEquipment) => {
  try {
    const equipmentToSend = {
      ...newEquipment,
      quantity: parseInt(newEquipment.quantity, 10) // Ensure quantity is an integer
    };
    const addedEquipment = await addequipment(equipmentToSend);
    setEquipments([...equipments, addedEquipment]);
    setShowProductModal(false);
  } catch (error) {
    console.error("Error adding equipment:", error);
  }
};

// Updated handleEditChange to handle quantity conversion for equipments
const handleEditChange = (event, equipmentId, field) => {
  let newValue = event.target.value;

  if (field === 'quantity') {
    // Check if newValue is not an empty string before converting to number
    newValue = newValue !== '' ? parseInt(newValue, 10) : '';
    // Handle case where newValue is not a number
    if (isNaN(newValue)) {
      newValue = ''; // or a default value like 0
    }
  }

  setEquipments(equipments.map(e => 
    e.id === equipmentId ? { ...e, [field]: newValue } : e
  ));
};

// Adjusted saveChanges to ensure quantity is processed as an integer when updating
const saveChanges = async (equipmentId, field, newValue) => {
  try {
    // Convert newValue to an integer if the field is 'quantity'
    const valueToSend = field === 'quantity' ? parseInt(newValue, 10) : newValue;
    const updatedEquipment = await updateequipment(equipmentId, { [field]: valueToSend });
    setEquipments(equipments.map(e => 
      e.id === equipmentId ? { ...e, ...updatedEquipment } : e
    ));
  } catch (error) {
    console.error("Error updating equipment:", error);
  }
};


  const handleEditKeyPress = (event, equipmentId, field) => {
    if (event.key === 'Enter') {
      const newValue = event.target.value;
      saveChanges(equipmentId, field, newValue);
      setEditingId(null);
      setEditingField('');
    }
  };

  const handleEditBlur = (event, equipmentId, field) => {
    const newValue = event.target.value;
    saveChanges(equipmentId, field, newValue);
    setEditingId(null);
    setEditingField('');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredEquipments = equipments.filter(equipment =>
    equipment.name.toLowerCase().includes(searchQuery) ||
    equipment.description.toLowerCase().includes(searchQuery)
  );

  const renderEditableCell = (text, equipmentId, field) => {
    if (editingId === equipmentId && editingField === field) {
      return (
        <TextField
          className="editable-cell-input"
          value={text}
          onChange={(event) => handleEditChange(event, equipmentId, field)}
          onKeyPress={(event) => handleEditKeyPress(event, equipmentId, field)}
          onBlur={(event) => handleEditBlur(event, equipmentId, field)}
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
    <Grid container className="equipment-inventory" spacing={2}>
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
              <FilterListIcon />
            </IconButton>
          </div>
          <div className="inventory-stats">
          <Typography variant="subtitle1">
            {`${filteredEquipments.length} of ${equipments.length} results`}
          </Typography>
          </div>
          <Button onClick={() => setShowProductModal(true)} startIcon={<AddIcon />}>New Equipment</Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}  className="inventory-table-container">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={6} align="center">
            <CircularProgress sx={{  color: '#ff9c2a' }} /> {/* Loading icon */}
          </TableCell>
        </TableRow>
      ) : (
        filteredEquipments.length > 0 ? (
                filteredEquipments.map((equipment) => (
                  <TableRow key={equipment.id}>
                    <TableCell onClick={() => { setEditingId(equipment.id); setEditingField('name'); }}>
                      {renderEditableCell(equipment.name, equipment.id, 'name')}
                    </TableCell>
                    <TableCell onClick={() => { setEditingId(equipment.id); setEditingField('description'); }}>
                      {renderEditableCell(equipment.description, equipment.id, 'description')}
                    </TableCell>
                    <TableCell onClick={() => { setEditingId(equipment.id); setEditingField('quantity'); }}>
                      {renderEditableCell(equipment.quantity, equipment.id, 'quantity')}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteProduct(equipment.id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No items found</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <NewProduct
        open={showProductModal}
        onClose={() => { setShowProductModal(false); setEditingProduct(null); }}
        onAddProduct={editingProduct ? handleEditProduct : handleAddProduct}
        product={editingProduct}
      />
    </Grid>
  );
};

export default EquipmentInventory;
