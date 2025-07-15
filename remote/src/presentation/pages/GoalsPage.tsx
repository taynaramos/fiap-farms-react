import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, TextField, MenuItem, Button, Snackbar, Alert, LinearProgress, Switch, FormControlLabel, Divider, List, ListItem, ListItemText, Chip } from '@mui/material';
import { Goal, GoalStatus } from '../../domain/entities/Goal';
import { GoalRepositoryFirebase } from '../../infra/repositories/GoalRepositoryFirebase';
import { CreateGoalUseCase } from '../../domain/usecases/goal/CreateGoalUseCase';
import { GetGoalsUseCase } from '../../domain/usecases/goal/GetGoalsUseCase';
import { UpdateGoalUseCase } from '../../domain/usecases/goal/UpdateGoalUseCase';
import { GetProductsUseCase } from '../../domain/usecases/product/GetProductsUseCase';
import { ProductRepositoryFirebase } from '../../infra/repositories/ProductRepositoryFirebase';
import { Product } from '../../domain/entities/Product';
import { parseDateToBrasilia, toDateString } from '../const/dateUtils';
import { UNITS } from '../const/units';

const TYPE_OPTIONS = [
  { value: 'vendas', label: 'Vendas' },
  { value: 'producao', label: 'Produção' },
];

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [form, setForm] = useState<Partial<Goal>>({ type: 'producao', targetUnit: 'kg', status: GoalStatus.ATIVA });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [showHistory, setShowHistory] = useState(false);
  const [notifyOnAchieve, setNotifyOnAchieve] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const repo = new GoalRepositoryFirebase();
  const getGoalsUseCase = new GetGoalsUseCase(repo);
  const createGoalUseCase = new CreateGoalUseCase(repo);
  const updateGoalUseCase = new UpdateGoalUseCase(repo);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const allGoals = await getGoalsUseCase.execute();
      setGoals(allGoals);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
    // Buscar produtos ao carregar a página
    const fetchProducts = async () => {
      const repo = new ProductRepositoryFirebase();
      const usecase = new GetProductsUseCase(repo);
      const prods = await usecase.execute();
      setProducts(prods);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (notifyOnAchieve && goals.length > 0) {
      goals.forEach(goal => {
        if (goal.status === GoalStatus.ATINGIDA && !goal.achievedAt) {
          console.log("META ATINGIDA - mostrando notificação para:", goal.name);
          setSnackbar({ open: true, message: `Meta atingida: ${goal.name}`, severity: 'success' });
          updateGoalUseCase.execute({ ...goal, achievedAt: new Date() });
        }
      });
    }
  }, [goals, notifyOnAchieve]);

  const handleFormChange = (field: keyof Goal, value: any) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const goal: Goal = {
        ...form,
        currentValue: 0,
        createdAt: new Date(),
        createdBy: 'admin', // TODO: Ajustar para usuário real
        startDate: parseDateToBrasilia(toDateString(form.startDate!)),
        endDate: parseDateToBrasilia(toDateString(form.endDate!)),
        status: GoalStatus.ATIVA,
      } as Goal;
      await createGoalUseCase.execute(goal);
      setSnackbar({ open: true, message: 'Meta criada com sucesso!', severity: 'success' });
      setForm({ type: 'vendas', targetUnit: 'unidade', status: GoalStatus.ATIVA });
      fetchGoals();
    } catch (e: any) {
      setSnackbar({ open: true, message: e.message || 'Erro ao criar meta', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const metasAtivas = goals.filter(g => g.status === GoalStatus.ATIVA || g.status === GoalStatus.ATINGIDA);
  const metasAtingidas = goals.filter(g => g.status === GoalStatus.ATINGIDA);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={2} color="primary">Metas e Notificações</Typography>
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>Definir Nova Meta</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <TextField label="Nome da Meta" value={form.name || ''} onChange={e => handleFormChange('name', e.target.value)} required sx={{ flex: 2, minWidth: 200 }} />
          <TextField select label="Tipo" value={form.type} onChange={e => handleFormChange('type', e.target.value)} required sx={{ flex: 1, minWidth: 120 }}>
            {TYPE_OPTIONS.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
          </TextField>
          <TextField select label="Produto" value={form.entityId || ''} onChange={e => handleFormChange('entityId', e.target.value)} required sx={{ flex: 1, minWidth: 180 }}>
            <MenuItem value="">Selecione o produto</MenuItem>
            {products.map(prod => (
              <MenuItem key={prod.id} value={prod.id}>{prod.name}</MenuItem>
            ))}
          </TextField>
          <TextField label="Valor da Meta" type="number" value={form.targetValue || ''} onChange={e => handleFormChange('targetValue', Number(e.target.value))} required sx={{ flex: 1, minWidth: 120 }} />
          <TextField select label="Unidade" value={form.targetUnit || ''} onChange={e => handleFormChange('targetUnit', e.target.value)} required sx={{ flex: 1, minWidth: 120 }}>
            {UNITS.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
          </TextField>
          <TextField label="Data de Início" type="date" value={form.startDate || ''} onChange={e => handleFormChange('startDate', e.target.value)} required sx={{ flex: 1, minWidth: 160 }} InputLabelProps={{ shrink: true }} />
          <TextField label="Data Final" type="date" value={form.endDate || ''} onChange={e => handleFormChange('endDate', e.target.value)} required sx={{ flex: 1, minWidth: 160 }} InputLabelProps={{ shrink: true }} />
          <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ height: 56, alignSelf: 'end', fontWeight: 700 }}>Salvar Meta</Button>
        </form>
      </Paper>
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight={600}>Metas Ativas</Typography>
          <FormControlLabel control={<Switch checked={notifyOnAchieve} onChange={e => setNotifyOnAchieve(e.target.checked)} color="primary" />} label="Notificar ao atingir meta" />
        </Box>
        <Divider sx={{ mb: 2 }} />
        {loading ? <LinearProgress /> : (
          <List>
            {metasAtivas.length === 0 && <Typography color="text.secondary">Nenhuma meta ativa.</Typography>}
            {metasAtivas.map(goal => {
              const progresso = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
              return (
                <ListItem key={goal.id} sx={{ mb: 2, bgcolor: progresso >= 100 ? '#e8f5e9' : '#fff', borderRadius: 2, boxShadow: progresso >= 100 ? 2 : 0 }}>
                  <ListItemText
                    primary={<>
                      <Typography fontWeight={700}>{goal.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{goal.type === 'vendas' ? 'Vendas' : 'Produção'}</Typography>
                      <Typography variant="body2" color="text.secondary">Valor da meta: {goal.targetValue} {goal.targetUnit}</Typography>
                      <Typography variant="body2" color="text.secondary">Valor atingido: {goal.currentValue} {goal.targetUnit}</Typography>
                      <Typography variant="body2" color="text.secondary">Produto: {products.find(p => p.id === goal.entityId)?.name || goal.entityId}</Typography>
                    </>}
                    secondary={<>
                      <Box display="flex" alignItems="center" gap={2} mt={1}>
                        <LinearProgress variant="determinate" value={progresso} sx={{ flex: 1, height: 10, borderRadius: 5, bgcolor: '#eee' }} />
                        <Typography fontWeight={600} color={progresso >= 100 ? 'success.main' : 'primary'}>{progresso}%</Typography>
                        {progresso >= 100 && <Chip label="Meta Atingida" color="success" size="small" />}
                      </Box>
                      <Typography variant="caption" color="text.secondary">Período: {new Date(goal.startDate).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })} - {new Date(goal.endDate).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</Typography>
                    </>}
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </Paper>
      <Button variant="outlined" color="primary" onClick={() => setShowHistory(h => !h)} sx={{ mb: 2 }}>
        {showHistory ? 'Ocultar Histórico' : 'Ver Histórico de Metas Atingidas'}
      </Button>
      {showHistory && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>Histórico de Metas Atingidas</Typography>
          <List>
            {metasAtingidas.length === 0 && <Typography color="text.secondary">Nenhuma meta atingida ainda.</Typography>}
            {metasAtingidas.map(goal => (
              <ListItem key={goal.id}>
                <ListItemText
                  primary={<Typography fontWeight={700}>{goal.name}</Typography>}
                  secondary={<>
                    <Typography variant="body2" color="text.secondary">{goal.type === 'vendas' ? 'Vendas' : 'Produção'}</Typography>
                    <Typography variant="body2" color="text.secondary">Produto: {products.find(p => p.id === goal.entityId)?.name || goal.entityId}</Typography>
                    <Typography variant="caption" color="text.secondary">Atingida em: {goal.achievedAt ? new Date(goal.achievedAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : '-'}</Typography>
                  </>}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 