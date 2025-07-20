import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Paper, Select, InputLabel, FormControl, CircularProgress, Snackbar, Alert, InputAdornment } from '@mui/material';
import { GetProductsUseCase } from '../../domain/usecases/product/GetProductsUseCase';
import { ProductRepositoryFirebase } from '../../infra/repositories/ProductRepositoryFirebase';
import { Product } from '../../domain/entities/Product';
import { auth } from 'shared/firebase';

export default function CreateSalePage() {
    const [product, setProduct] = useState('');
    const [estimatedCost, setEstimatedCostAtSale] = useState('');
    const [quantitySold, setQuantitySold] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const repo = new ProductRepositoryFirebase();
        const useCase = new GetProductsUseCase(repo);
        useCase.execute().then(setProducts).finally(() => setLoadingProducts(false));
    }, []);

    return (
        <Paper elevation={3} sx={{ maxWidth: 420, mx: 'auto', my: 4, p: 3, borderRadius: 2 }}>
            <Typography variant="h5" align="center" color="primary" fontWeight={700} mb={3}>
                Registrar venda
            </Typography>
            <Box component="form" noValidate>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="product-label">Produto *</InputLabel>
                    <Select
                        labelId="product-label"
                        value={product}
                        label="Produto *"
                        onChange={e => setProduct(e.target.value)}
                        required
                        disabled={loadingProducts}
                    >
                        <MenuItem value="">Selecione um produto</MenuItem>
                        {products.map(opt => (
                            <MenuItem key={opt.id} value={opt.id}>{opt.name}</MenuItem>
                        ))}
                    </Select>
                    {loadingProducts && <CircularProgress size={24} sx={{ position: 'absolute', right: 16, top: 16 }} />}
                </FormControl>
                <TextField
                    label="Quantidade"
                    type="number"
                    value={quantitySold}
                    onChange={e => setQuantitySold(e.target.value.replace(/[^0-9,]/g, ''))}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Custo Estimado por Unidade"
                    type="number"
                    value={estimatedCost}
                    onChange={e => setEstimatedCostAtSale(e.target.value.replace(/[^0-9,]/g, ''))}
                    required
                    fullWidth
                    margin="normal"
                    placeholder="0,00"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        inputMode: 'decimal',
                    }}
                />
                <TextField
                    label="Cliente (Opcional)"
                    type="text"
                    fullWidth
                    margin="normal"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ mt: 2, fontWeight: 700 }}
                // disabled={loading}
                >
                    Registrar
                </Button>
            </Box>
        </Paper>
    );
} 