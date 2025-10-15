import React, { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const API_URL = 'http://localhost:9001/product'; // change if needed

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  width: '90%',
  maxWidth: 450,
};

export const ProductModal = ({ open, onClose, product, onSaved }) => {
  const isEdit = Boolean(product?._id);

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        price: product.price || '',
        category: product.category || '',
        imageUrl: product.imageUrl || '',
      });
    } else {
      setForm({ name: '', price: '', category: '', imageUrl: '' });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      alert('Name and price are required!');
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await axios.put(`${API_URL}/update/${product._id}`, form);
      } else {
        await axios.post(`${API_URL}/add`, form);
      }

      onSaved(); // refresh product list
      onClose(); // close modal
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            {isEdit ? 'Edit Product' : 'Add Product'}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack spacing={2}>
          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Price (₹)"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading
              ? isEdit
                ? 'Updating...'
                : 'Adding...'
              : isEdit
              ? 'Update Product'
              : 'Add Product'}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ProductModal;
