import React, { useState, useEffect } from 'react';
import { fetchequipments, addequipment, updateequipment, deleteequipment } from '@/app/apiService';
import {
  Button, TextField, Checkbox, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Grid, Typography,
  InputAdornment, CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import './EquipmentInventory.scss';
import BackButton from '@/Buttons/BackButton/BackButton';
import NewProduct from '@/Buttons/NewProductEquipment/NewProduct';

const EquipmentInventory = ({ onBack }) => {
  const [equipments, setEquipments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingField, setEditingField] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const equipmentsData = await fetchequipments();
        setEquipments(equipmentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleAddProduct = async (newEquipment) => {
    try {
      const equipmentToSend = {
        ...newEquipment,
        quantity: parseInt(newEquipment.quantity, 10)
      };
      const addedEquipment = await addequipment(equipmentToSend);
      setEquipments([...equipments, addedEquipment]);
      setShowProductModal(false);
    } catch (error) {
      console.error("Error adding equipment:", error);
    }
  };

  const handleEditChange = (event, equipmentId, field) => {
    let newValue = event.target.value;
    if (field === 'quantity') {
      newValue = parseInt(newValue, 10);
    }
    setEquipments(equipments.map(e => 
      e.id === equipmentId ? { ...e, [field]: newValue } : e
    ));
  };

  const saveChanges = async (equipmentId, field, newValue) => {
    try {
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

  const renderEditableCell = (text, equipmentId, field) => (
    editingId === equipmentId && editingField === field ? (
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
    ) : text
  );

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
        <TableContainer component={Paper} className="inventory-table-container">
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
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : filteredEquipments.length > 0 ? (
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
                      <IconButton onClick={() => deleteequipment(equipment.id).then(() => setEquipments(equipments.filter(e => e.id !== equipment.id)))}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">No items found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
  
      <NewProduct
        open={showProductModal}
        onClose={() => { setShowProductModal(false); setEditingProduct(null); }}
        onAddProduct={handleAddProduct}
        product={editingProduct}
      />
    </Grid>
  );  
};

  export default EquipmentInventory;




