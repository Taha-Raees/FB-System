import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import BuildIcon from '@mui/icons-material/Build';
import TruckInventory from '@/Components/DashboardItem/Inventory/InventoryItem/TruckInventory/TruckInventory';
import FoodInventory from '@/Components/DashboardItem/Inventory/InventoryItem/FoodInventory/FoodInventory';
import EquipmentInventory from '@/Components/DashboardItem/Inventory/InventoryItem/EquipmentInventory/EquipmentInventory';
import './Inventory.scss';

const Inventory = () => {
  const [currentView, setCurrentView] = useState('menu');
  const renderView = () => {
    switch(currentView) {
      case 'manageTruck':
        return <TruckInventory onBack={() => setCurrentView('menu')} />;
      case 'manageFood':
         return <FoodInventory onBack={() => setCurrentView('menu')} />;
      case 'manageEquipment':
      return <EquipmentInventory onBack={() => setCurrentView('menu')} />;
      // Add cases for other views
      default:
        return renderMenu();
    }
  };
  const renderMenu = () => (
    <>
      {/* Trucks Inventory */}
      <Card variant="outlined" className="inventory-card" onClick={() => setCurrentView('manageTruck')}>
        <CardContent>
          <LocalShippingIcon className="card-icon" />
          <Typography variant="h5" component="h2">Truck Inventory</Typography>
          <Typography variant="body2">Manage and track your fleet of trucks.</Typography>
        </CardContent>
      </Card>

      {/* Food Inventory */}
      <Card variant="outlined" className="inventory-card" onClick={() => setCurrentView('manageFood')}>
        <CardContent>
          <FastfoodIcon className="card-icon" />
          <Typography variant="h5" component="h2">Food Inventory</Typography>
          <Typography variant="body2">Monitor stock and supplies of food items.</Typography>
        </CardContent>
      </Card>

      {/* Equipment Inventory */}
      <Card variant="outlined" className="inventory-card" onClick={() => setCurrentView('manageEquipment')}>
        <CardContent>
          <BuildIcon className="card-icon" />
          <Typography variant="h5" component="h2">Equipment Inventory</Typography>
          <Typography variant="body2">Keep track of equipment and tools.</Typography>
        </CardContent>
      </Card>

      {/* Additional inventory features */}
      {/* ... Add more cards for other features like Supply Ordering, Inventory Analysis, etc. */}
    </>
  );

  return (
    <div className="inventory-page">
      {renderView()}
    </div>
  );
};

export default Inventory;