import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Paper, Select, InputLabel, FormControl, CircularProgress, Snackbar, Alert, InputAdornment } from '@mui/material';
import { GetProductsUseCase } from '../../domain/usecases/product/GetProductsUseCase';
import { ProductRepositoryFirebase } from '../../infra/repositories/ProductRepositoryFirebase';
import { Product } from '../../domain/entities/Product';
import { CreateSalesRecordUseCase } from '../../domain/usecases/sales/CreateSalesRecordUseCase';
import { SalesRecord } from '../../domain/entities/SalesRecord';
import { SalesRecordRepositoryFirebase } from '../../infra/repositories/SalesRecordRepositoryFirebase';
import { auth } from 'shared/firebase';

export default function CreateSalePage() {
    const [product, setProduct] = useState('');
    const [estimatedCost, setEstimatedCostAtSale] = useState('');
    const [quantitySold, setQuantitySold] = useState('');
    const [clientInfo, setClientInfo] = useState('');
    const [notes, setNotes] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const repo = new ProductRepositoryFirebase();
        const useCase = new GetProductsUseCase(repo);
        useCase.execute().then(setProducts).finally(() => setLoadingProducts(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const selectedProduct = products.find(p => p.id === product);
            if (!selectedProduct) throw new Error('Selecione um produto válido.');
            const qSold = Number(quantitySold);
            const estCost = Number(estimatedCost);
            if (!qSold || !estCost) throw new Error('Preencha todos os campos obrigatórios.');
            const salePricePerUnit = 0; // TODO: adicionar campo de preço de venda por unidade no formulário
            const totalSaleAmount = qSold * salePricePerUnit;
            const estimatedCostAtSale = estCost * qSold;
            const calculatedProfit = totalSaleAmount - estimatedCostAtSale;
            const repo = new SalesRecordRepositoryFirebase();
            const useCase = new CreateSalesRecordUseCase(repo);
            await useCase.execute({
                productId: selectedProduct.id,
                productName: selectedProduct.name,
                productionBatchId: undefined, // TODO: adicionar campo se necessário
                quantitySold: qSold,
                unitOfMeasure: selectedProduct.unitOfMeasure,
                salePricePerUnit,
                totalSaleAmount,
                estimatedCostAtSale,
                calculatedProfit,
                saleDate: new Date(),
                clientInfo: clientInfo || undefined,
                notes: notes || undefined,
                createdAt: new Date(),
                createdBy: auth.currentUser?.uid || 'anon',
            });
            setSnackbar({ open: true, message: 'Venda registrada com sucesso!', severity: 'success' });
            setProduct('');
            setEstimatedCostAtSale('');
            setQuantitySold('');
            setClientInfo('');
            setNotes('');
        } catch (e: any) {
            setSnackbar({ open: true, message: e.message || 'Erro ao registrar venda', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 420, mx: 'auto', my: 4, p: 3, borderRadius: 2 }}>
            <Typography variant="h5" align="center" color="primary" fontWeight={700} mb={3}>
                Registrar venda
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="product-label">Produto *</InputLabel>
                    <Select
                        labelId="product-label"
                        value={product}
                        label="Produto *"
                        onChange={(e: React.ChangeEvent<{ value: unknown }>) => setProduct(e.target.value as string)}
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantitySold(e.target.value.replace(/[^0-9,]/g, ''))}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Custo Estimado por Unidade"
                    type="number"
                    value={estimatedCost}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEstimatedCostAtSale(e.target.value.replace(/[^0-9,]/g, ''))}
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
                    value={clientInfo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientInfo(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Notas (Opcional)"
                    type="text"
                    value={notes}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ mt: 2, fontWeight: 700 }}
                    disabled={loading}
                >
                    {loading ? 'Registrando...' : 'Registrar'}
                </Button>
            </Box>
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
                <Alert onClose={() => setSnackbar(s => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
} 