import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import BuildIcon from '@mui/icons-material/Build';

import './Finance.scss';
import POS from './POS/POS';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

const Finance = () => {
    const [currentView, setCurrentView] = useState('menu');
  const renderView = () => {
    switch(currentView) {
      case 'POS':
        return <POS onBack={() => setCurrentView('menu')} />;
      
      default:
        return renderMenu();
    }
  };
  const renderMenu = () => (
    <>
      {/* POS */}
      <Card variant="outlined" className="inventory-card" onClick={() => setCurrentView('POS')}>
        <CardContent>
          <PointOfSaleIcon className="card-icon" />
          <Typography variant="h5" component="h2">POS</Typography>
          <Typography variant="body2">Manage and track your fleet of trucks.</Typography>
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


export default Finance