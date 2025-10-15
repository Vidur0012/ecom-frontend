import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Box,Typography,Table,TableHead,TableBody,TableRow,TableCell,TableContainer,Paper,IconButton,Button,Stack,} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const API_URL = 'http://localhost:9001/cart'; // change if needed

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Fetch cart data
  const fetchCart = async () => {
    try {
        const res = await axios.get(
            API_URL,
            {
                headers: {
                    'user-id': 1,
                }
            }
        );
      setCart(res.data.items || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Increase quantity
  const increaseQty = async (productId) => {
    try {
      const item = cart.find((i) => i.product._id === productId);
      const newQty = item.quantity + 1;
      await axios.put(`${API_URL}/update/${productId}`, { qty: newQty }, { headers: { 'user-id': 1 } });
      fetchCart();
    } catch (err) {
      console.error('Error increasing quantity:', err);
    }
  };

  // Decrease quantity
  const decreaseQty = async (productId) => {
    try {
      const item = cart.find((i) => i.product._id === productId);
      if (item.quantity <= 1) return;
      const newQty = item.quantity - 1;
      await axios.put(`${API_URL}/update/${productId}`, { qty: newQty, }, { headers: { 'user-id': 1 } });
      fetchCart();
    } catch (err) {
      console.error('Error decreasing quantity:', err);
    }
  };

  // Remove product from cart
  const removeItem = async (productId) => {
    try {
      await axios.delete(`${API_URL}/remove/${productId}`,{ headers: { 'user-id': 1 } });
      fetchCart();
    } catch (err) {
      console.error('Error deleting cart item:', err);
    }
  };

  // Calculate total
  const subtotal = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        🛒 My Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography color="text.secondary" align="center" mt={6}>
          Your cart is empty.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Product</b></TableCell>
                <TableCell align="center"><b>Price</b></TableCell>
                <TableCell align="center"><b>Quantity</b></TableCell>
                <TableCell align="center"><b>Total</b></TableCell>
                <TableCell align="center"><b>Action</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.product._id}>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <img
                        src={item.product.imageUrl || 'https://via.placeholder.com/60'}
                        alt={item.product.name}
                        width="60"
                        height="50"
                        style={{ borderRadius: 6, objectFit: 'cover' }}
                      />
                      <Box>
                        <Typography fontWeight={600}>{item.product.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.product.category || 'General'}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell align="center">₹{item.product.price}</TableCell>

                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => decreaseQty(item.product._id)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => increaseQty(item.product._id)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>

                  <TableCell align="center">
                    ₹{item.product.price * item.quantity}
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => removeItem(item.product._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Summary */}
      {cart.length > 0 && (
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Subtotal: ₹{subtotal.toLocaleString()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ShoppingCartCheckoutIcon />}
          >
            Proceed to Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
