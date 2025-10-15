import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Container, Box } from '@mui/material';
import ProtectedRoute from './ProtectedRoute';

const ProductCatalog = lazy(() => import('../components/product/ProductCatalog'));
const ProductList = lazy(() => import('../components/product/ProductList'));
const Cart = lazy(() => import('../components/cart/Cart'));
const Header = lazy(() => import('../components/header/Header'));

export const AppRoutes = () => {
    return (
        <Router>
            {/* Header should be full-width */}
            <Header cartCount={2} />

            {/* Page content should be centered with margin */}
            <Box sx={{ mt: 4 }}>
                <Container maxWidth="lg">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<ProductCatalog />} />
                            {/* <Route path="/products" element={<ProductList />} /> */}
                            <Route
                                path="/products"
                                element={
                                    <ProtectedRoute>
                                        <ProductList />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/cart" element={<Cart />} />
                        </Routes>
                    </Suspense>
                </Container>
            </Box>
        </Router>
    );
};
