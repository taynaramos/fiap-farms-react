import { Alert, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { auth } from 'shared/firebase';
import { Product } from '../../domain/entities/Product';
import { StatusKey } from '../../domain/enums/StatusKey';
import { GetProductsUseCase } from '../../domain/usecases/product/GetProductsUseCase';
import { CreateProductionBatchUseCase } from '../../domain/usecases/production/CreateProductionBatchUseCase';
import { ProductionBatchRepositoryFirebase } from '../../infra/repositories/ProductionBatchRepositoryFirebase';
import { ProductRepositoryFirebase } from '../../infra/repositories/ProductRepositoryFirebase';
import { getFutureISO, getTodayISO } from '../const/dateUtils';
import { STATUS_LABELS } from '../const/statusLabels';

export default function CreateProductionBatchPage() {
  const [product, setProduct] = useState('');
  const [startDate, setStartDate] = useState(getTodayISO());
  const [estimatedEndDate, setEstimatedEndDate] = useState(getFutureISO(3));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    const selectedProduct = products.find(p => p.id === product);
    if (!selectedProduct) return;
    const repo = new ProductionBatchRepositoryFirebase();
    const useCase = new CreateProductionBatchUseCase(repo);
    const user = auth.currentUser;
    if (!user) {
      setSnackbar({ open: true, message: 'Usuário não autenticado', severity: 'error' });
      return;
    }
    try {
      await useCase.execute({
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        startDate: new Date(startDate),
        estimatedEndDate: new Date(estimatedEndDate),
        status,
        estimatedQuantity: Number(estimatedQuantity),
        notes,
      });
      window.location.reload();
      setSnackbar({ open: true, message: 'Lote criado com sucesso!', severity: 'success' });
    } catch (err: any) {
      setSnackbar({ open: true, message: err?.message || 'Erro ao criar lote', severity: 'error' });
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 420, mx: 'auto', my: 4, p: 3, borderRadius: 2 }}>
      <Typography variant="h5" align="center" color="primary" fontWeight={700} mb={3}>
        Novo Lote de Produção
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
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
          label="Data de Início *"
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Data Estimada de Colheita *"
          type="date"
          value={estimatedEndDate}
          onChange={e => setEstimatedEndDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Quantidade Estimada *"
          type="number"
          inputProps={{ min: 0, step: 0.01 }}
          value={estimatedQuantity}
          onChange={e => setEstimatedQuantity(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="status-label">Status Inicial</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            label="Status Inicial"
            onChange={e => setStatus(e.target.value as StatusKey)}
          >
            {STATUS_LABELS.map(opt => (
              <MenuItem key={opt.key} value={opt.key}>
                {opt.icon} {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Observações"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          minRows={3}
          placeholder="Informações adicionais sobre o lote..."
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 2, fontWeight: 700, fontSize: 16 }}
        >
          Criar Lote de Produção
        </Button>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar(s => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
} 