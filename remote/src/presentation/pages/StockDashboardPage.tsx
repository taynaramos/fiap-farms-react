import { useEffect, useState } from 'react';
import { STATUS_LABELS } from '../const/statusLabels';
import { Box, Button, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material';
import CreateStockPage from './CreateStockPage';
import CreateSalePage from './CreateSalePage';

const STATUS_FILTERS = [
  { key: 'all', label: 'Todos' },
  ...STATUS_LABELS.map(({ key, label }) => ({ key, label })),
];

export default function StockDashboardPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
      {showCreate ? (
        <div style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
          <CreateSalePage />
          <CreateStockPage />
        </div>
      ) : (
        <div>
          <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '24px 0 12px 0' }}>
            <h1>Adicionar ao estoque</h1>
            <Button variant="contained" color="primary">
              Adicionar ao estoque
            </Button>
          </Container>

        </div>
      )}

    </div>
  );
} 