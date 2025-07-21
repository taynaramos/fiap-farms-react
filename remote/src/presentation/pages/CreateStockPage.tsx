import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Paper, Select, InputLabel, FormControl, CircularProgress, Snackbar, Alert } from '@mui/material';
import { StatusKey } from '../../domain/enums/StatusKey';
import { GetProductsUseCase } from '../../domain/usecases/product/GetProductsUseCase';
import { ProductRepositoryFirebase } from '../../infra/repositories/ProductRepositoryFirebase';
import { Product } from '../../domain/entities/Product';
import { STATUS_LABELS } from '../const/statusLabels';
import { getTodayISO, getFutureISO } from '../const/dateUtils';
import { CreateInventoryUseCase } from '../../domain/usecases/inventory/CreateInventoryUseCase';
import { InventoryRepositoryFirebase } from '../../infra/repositories/InventoryRepositoryFirebase';
import { auth } from 'shared/firebase';

export default function CreateStockPage() {
    const [product, setProduct] = useState('');
    const [estimatedQuantity, setEstimatedQuantity] = useState('');
    const [status, setStatus] = useState(StatusKey.PLANEJADO);
    const [notes, setNotes] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const repo = new ProductRepositoryFirebase();
        const useCase = new GetProductsUseCase(repo);
        useCase.execute().then(setProducts).finally(() => setLoadingProducts(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!product) return;
        const selectedProduct = products.find(p => p.id === product);
        if (!selectedProduct) return;
        const repo = new InventoryRepositoryFirebase();
        const useCase = new CreateInventoryUseCase(repo);
        const user = auth.currentUser;
        if (!user) {
            setSnackbar({ open: true, message: 'Usuário não autenticado', severity: 'error' });
            return;
        }
        try {
            await useCase.execute({
                productId: selectedProduct.id,
                productName: selectedProduct.name,
                productionBatchId: null,
                availableQuantity: Number(estimatedQuantity),
                soldQuantity: 0,
                unitOfMeasure: selectedProduct.unitOfMeasure,
                estimatedCostPerUnit: selectedProduct.estimatedCostPerUnit,
                lastUpdated: new Date(),
                createdBy: user.uid
            });
            setSnackbar({ open: true, message: 'Estoque cadastrado com sucesso!', severity: 'success' });
            setProduct('');
            setEstimatedQuantity('');
        } catch (err: any) {
            setSnackbar({ open: true, message: err?.message || 'Erro ao cadastrar estoque', severity: 'error' });
        }
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 420, mx: 'auto', my: 4, p: 3, borderRadius: 2 }}>
            <Typography variant="h5" align="center" color="primary" fontWeight={700} mb={3}>
                Adicionar ao estoque
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="product-label">Produto *</InputLabel>
                    <Select
                        labelId="product-label"
                        value={product}
                        label="Produto *"
                        onChange={e => setProduct(e.target.value as string)}
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
                    value={estimatedQuantity}
                    fullWidth
                    margin="normal"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEstimatedQuantity(e.target.value)}
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
                    Adicionar
                </Button>
            </Box>
        </Paper>
    );
} 