import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia,CardContent, CardActions, Typography, Button, TextField, Box, CircularProgress, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

const API_URL = 'http://localhost:9001';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/product`);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // add product to cart
  const addItem = async (productId) => {
    try {
      await axios.post(`${API_URL}/cart/add`, { productId }, { headers: { 'user-id': 1 } });
    } catch (err) {
      console.error('Error adding cart item:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box>


      {/* Loader */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : products.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No products found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((p) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: '0.2s',
                  '&:hover': { boxShadow: 6, transform: 'translateY(-3px)' },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={p.imageUrl}
                  alt={p.name}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="600" noWrap>
                    {p.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {p.category || 'General'}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ₹{p.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => addItem(p._id)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductCatalog;
