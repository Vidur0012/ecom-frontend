import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Button, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useLocation } from 'react-router';

const Header = () => {
  const location = useLocation();
  const userId = localStorage.getItem('user-id');

  return (
    <AppBar position="sticky" color="primary" elevation={3}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left - Logo / Title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: '600',
            letterSpacing: 0.5,
          }}
        >
          🛍️ MyStore
        </Typography>

        {/* Center - Navigation links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/"
            color={location.pathname === '/' ? 'secondary' : 'inherit'}
            sx={{ color: 'white', textTransform: 'none', fontWeight: 500 }}
          >
            Home
          </Button>
          {userId === '0' && (
          <Button
            component={Link}
            to="/products"
            color={location.pathname === '/products' ? 'secondary' : 'inherit'}
            sx={{ color: 'white', textTransform: 'none', fontWeight: 500 }}
          >
            Products
          </Button>)}
        </Box>

        {/* Right - Cart icon */}
        <IconButton
          component={Link}
          to="/cart"
          color="inherit"
          sx={{ color: 'white' }}
        >
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
