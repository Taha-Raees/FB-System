import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import BuildIcon from '@mui/icons-material/Build';
import './Inventory.scss';

const Inventory = () => {
  const handleTrucks = () => {/* ... */};
  const handleFood = () => {/* ... */};
  const handleEquipment = () => {/* ... */};

  return (
    <div className="inventory-page">
      {/* Trucks Inventory */}
      <Card variant="outlined" className="inventory-card" onClick={handleTrucks}>
        <CardContent>
          <LocalShippingIcon className="card-icon" />
          <Typography variant="h5" component="h2">Truck Inventory</Typography>
          <Typography variant="body2">Manage and track your fleet of trucks.</Typography>
        </CardContent>
      </Card>

      {/* Food Inventory */}
      <Card variant="outlined" className="inventory-card" onClick={handleFood}>
        <CardContent>
          <FastfoodIcon className="card-icon" />
          <Typography variant="h5" component="h2">Food Inventory</Typography>
          <Typography variant="body2">Monitor stock and supplies of food items.</Typography>
        </CardContent>
      </Card>

      {/* Equipment Inventory */}
      <Card variant="outlined" className="inventory-card" onClick={handleEquipment}>
        <CardContent>
          <BuildIcon className="card-icon" />
          <Typography variant="h5" component="h2">Equipment Inventory</Typography>
          <Typography variant="body2">Keep track of equipment and tools.</Typography>
        </CardContent>
      </Card>

      {/* Additional inventory features */}
      {/* ... Add more cards for other features like Supply Ordering, Inventory Analysis, etc. */}
    </div>
  );
};

export default Inventory;
