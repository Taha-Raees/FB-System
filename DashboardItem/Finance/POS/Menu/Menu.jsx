// Menu.jsx
import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Menu.scss';

const menuItems = [
  { id: 1, name: 'BratWurst mit Brotchen', price: 5.0 },
  { id: 2, name: 'BratWurst mit Pommes', price: 8.0 },
  { id: 3, name: 'CurryWurst mit Brotchen', price: 5.5 },
  { id: 4, name: 'CurryWurst mit Pommes', price: 8.5 },
  { id: 5, name: 'Pommes', price: 6.0 },
  { id: 6, name: 'Hamburger', price: 9.5 },
  { id: 7, name: 'Cheese Burger', price: 10.5 },
  { id: 8, name: 'Loaded Fries', price: 6.0 },
  // ... other menu items
];

const Menu = ({ onAddToOrder }) => {
  return (
    <Grid container spacing={2} className="menu-grid">
      {menuItems.map((item) => (
        <Grid item key={item.id} xs={4}>
          <Card className="menu-item-card" onClick={() => onAddToOrder(item)}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  €{item.price.toFixed(2)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Menu;
