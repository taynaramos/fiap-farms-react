import { Alert, Box, Button, CircularProgress, FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { auth } from 'shared/firebase';
import { Inventory } from '../../domain/entities/Inventory';
import { Product } from '../../domain/entities/Product';
import { GetInventoryUseCase } from '../../domain/usecases/inventory/GetInventoryUseCase';
import { UpdateInventoryQuantityUseCase } from '../../domain/usecases/inventory/UpdateInventoryQuantityUseCase';
import { GetProductsUseCase } from '../../domain/usecases/product/GetProductsUseCase';
import { CreateSalesRecordUseCase } from '../../domain/usecases/sales/CreateSalesRecordUseCase';
import { InventoryRepositoryFirebase } from '../../infra/repositories/InventoryRepositoryFirebase';
import { ProductRepositoryFirebase } from '../../infra/repositories/ProductRepositoryFirebase';
import { SalesRecordRepositoryFirebase } from '../../infra/repositories/SalesRecordRepositoryFirebase';

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
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [availableStock, setAvailableStock] = useState<number | null>(null);
    const [stockError, setStockError] = useState<string | null>(null);
    const [salePricePerUnit, setSalePricePerUnit] = useState('');

    useEffect(() => {
        const repo = new ProductRepositoryFirebase();
        const useCase = new GetProductsUseCase(repo);
        useCase.execute().then(setProducts).finally(() => setLoadingProducts(false));
    }, []);

    useEffect(() => {
        async function fetchInventory() {
            if (!product) {
                setAvailableStock(null);
                setInventory([]);
                return;
            }
            const repo = new InventoryRepositoryFirebase();
            const useCase = new GetInventoryUseCase(repo);
            const allInventory = await useCase.execute();
            const productInventory = allInventory.find(i => i.productId === product);
            setInventory(allInventory);
            setAvailableStock(productInventory ? productInventory.availableQuantity : 0);
        }
        fetchInventory();
    }, [product]);

    useEffect(() => {
        if (!quantitySold || !product) {
            setStockError(null);
            return;
        }
        const qSold = Number(quantitySold);
        if (availableStock !== null && qSold > availableStock) {
            setStockError('Quantidade indisponível em estoque.');
        } else {
            setStockError(null);
        }
    }, [quantitySold, availableStock, product]);


    useEffect(() => {
        if (!product) {
            setEstimatedCostAtSale('');
            return;
        }
        const selectedProduct = products.find(p => p.id === product);
        if (selectedProduct) {
            setEstimatedCostAtSale(String(selectedProduct.estimatedCostPerUnit));
        }
    }, [product, products]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (availableStock === null || Number(quantitySold) > availableStock) {
            setStockError('Quantidade indisponível em estoque.');
            return;
        }
        if (!salePricePerUnit || Number(salePricePerUnit) <= 0) {
            setSnackbar({ open: true, message: 'Informe um preço de venda válido.', severity: 'error' });
            return;
        }
        setLoading(true);
        try {
            const selectedProduct = products.find(p => p.id === product);
            if (!selectedProduct) throw new Error('Selecione um produto válido.');
            const qSold = Number(quantitySold);
            const estCost = Number(estimatedCost);
            const salePrice = Number(salePricePerUnit);
            if (!qSold || !estCost) throw new Error('Preencha todos os campos obrigatórios.');
            const totalSaleAmount = qSold * salePrice;
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
                salePricePerUnit: salePrice,
                totalSaleAmount,
                estimatedCostAtSale,
                calculatedProfit,
                saleDate: new Date(),
                clientInfo: clientInfo || undefined,
                notes: notes || undefined,
                createdAt: new Date(),
                createdBy: auth.currentUser?.uid || 'anon',
            });
            // Atualizar estoque após venda
            const inventoryRepo = new InventoryRepositoryFirebase();
            const updateInventoryUseCase = new UpdateInventoryQuantityUseCase(inventoryRepo);
            await updateInventoryUseCase.execute(selectedProduct.id, qSold);
            setSnackbar({ open: true, message: 'Venda registrada com sucesso!', severity: 'success' });
            setProduct('');
            setEstimatedCostAtSale('');
            setSalePricePerUnit('');
            setQuantitySold('');
            setClientInfo('');
            setNotes('');
            setAvailableStock(null);
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
                    value={quantitySold}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantitySold(e.target.value.replace(/[^0-9,]/g, ''))}
                    fullWidth
                    margin="normal"
                    required
                    error={!!stockError}
                    helperText={stockError ? <span style={{ color: 'red' }}>{stockError}</span> : (availableStock !== null && product ? <span style={{ color: 'green' }}>Disponível: {availableStock} kg</span> : '')}
                />
                <Box mb={2} mt={1}>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                        Custo Estimado por Unidade:
                        <span style={{ color: '#388e3c', marginLeft: 8 }}>
                            R$ {estimatedCost ? Number(estimatedCost).toFixed(2) : '--'}
                        </span>
                    </Typography>
                </Box>
                <TextField
                    label="Preço de Venda por Unidade"
                    type="number"
                    value={salePricePerUnit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const valor = e.target.value.replace(',', '.');
                        setSalePricePerUnit(valor);
                    }}
                    required
                    fullWidth
                    margin="normal"
                    placeholder="0,00"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        inputMode: 'decimal',
                    }}
                    inputProps={{
                        step: 'any',
                        min: 0
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
                    disabled={loading || !!stockError}
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