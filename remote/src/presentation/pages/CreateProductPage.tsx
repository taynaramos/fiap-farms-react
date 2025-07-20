import CategoryIcon from '@mui/icons-material/Category';
import StraightenIcon from '@mui/icons-material/Straighten';
import {
  Alert,
  Box, Button,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Paper,
  Snackbar,
  Switch,
  TextField, Typography
} from '@mui/material';
import React, { useState } from 'react';
import { Product } from '../../domain/entities/Product';
import { CreateProductUseCase } from '../../domain/usecases/product/CreateProductUseCase';
import { ProductRepositoryFirebase } from '../../infra/repositories/ProductRepositoryFirebase';
import { UNITS } from '../const/units';
import withLayoutAndAuth from './withLayoutAndAuth';

const CATEGORIES = [
  { value: 'hortalicas', label: 'Hortaliças' },
  { value: 'frutas', label: 'Frutas' },
  { value: 'graos', label: 'Grãos' },
  { value: 'graos', label: 'Legumes' },
  { value: 'graos', label: 'Tubérculos' },
  { value: 'outros', label: 'Outros' },
];

 function CreateProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [unit, setUnit] = useState(UNITS[0].value);
  const [cost, setCost] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const repo = new ProductRepositoryFirebase();
      const usecase = new CreateProductUseCase(repo);
      const product = new Product(
        '',
        name,
        description,
        category,
        unit,
        parseFloat(cost.replace(',', '.')),
        new Date(),
        'admin', // ajuste para usuário real se necessário
        isActive
      );
      await usecase.execute(product);
      setSnackbar({open: true, message: 'Produto cadastrado com sucesso!', severity: 'success'});
      setName(''); setDescription(''); setCategory(CATEGORIES[0].value); setUnit(UNITS[0].value); setCost(''); setIsActive(true);
    } catch (e: any) {
      setSnackbar({open: true, message: e.message || 'Erro ao cadastrar produto', severity: 'error'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight={700} align="center" color="primary" mb={2}>
          Cadastrar Produto
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Nome do Produto"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
            placeholder="Digite o nome do produto"
            InputProps={{ startAdornment: <InputAdornment position="start"></InputAdornment> }}
          />
          <TextField
            label="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            minRows={2}
            placeholder="Digite a descrição do produto"
            InputProps={{ startAdornment: <InputAdornment position="start"></InputAdornment> }}
          />
          <TextField
            select
            label="Categoria"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
            fullWidth
            margin="normal"
            placeholder="Selecione a categoria"
            InputProps={{ startAdornment: <InputAdornment position="start"><CategoryIcon color="action" /></InputAdornment> }}
          >
            {CATEGORIES.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>
                <Box ml={1}>{opt.label}</Box>
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Unidade de Medida"
            value={unit}
            onChange={e => setUnit(e.target.value)}
            required
            fullWidth
            margin="normal"
            placeholder="Selecione a unidade"
            InputProps={{ startAdornment: <InputAdornment position="start"><StraightenIcon color="action" /></InputAdornment> }}
          >
            {UNITS.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>
                <Box ml={1}>{opt.label}</Box>
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Custo Estimado por Unidade"
            value={cost}
            onChange={e => setCost(e.target.value.replace(/[^0-9,]/g, ''))}
            required
            fullWidth
            margin="normal"
            placeholder="0,00"
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              inputMode: 'decimal',
            }}
          />
          <Box display="flex" alignItems="center" mt={2} mb={2}>
            <FormControlLabel
              control={<Switch checked={isActive} onChange={e => setIsActive(e.target.checked)} color="primary" />}
              label={<>
                <Typography fontWeight={600} color={isActive ? 'success.main' : 'text.secondary'}>
                  Produto Ativo
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Disponível para produção e venda
                </Typography>
              </>}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2, fontWeight: 700 }}
            disabled={loading}
          >
            Cadastrar Produto
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 

export default withLayoutAndAuth(CreateProductPage)