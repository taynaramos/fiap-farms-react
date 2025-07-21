import { useEffect, useState } from 'react';
import { STATUS_LABELS } from '../const/statusLabels';
import { Box, Button, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material';
import CreateStockPage from './CreateStockPage';
import CreateSalePage from './CreateSalePage';
import StockProductCard from '../components/stockDashboard/ProductsList';

export default function StockDashboardPage() {
  const [showCreate, setShowCreate] = useState(false);

  const stockProducts = [
    {
      productName: "Tomate Italiano",
      estimatedQuantity: 150,
      actualQuantity: 120,
      estimatedCostPerUnit: 1.00,
    },
    {
      productName: "Alface Crespa",
      estimatedQuantity: 100,
      actualQuantity: 90,
      estimatedCostPerUnit: 0.80,
    },
  ];

  return (
    <div style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
      {showCreate ? (
        <div>
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {stockProducts.map((item, index) => (
              <StockProductCard key={index} item={item} index={index} />
            ))}
          </Box>
        </div>
      )}
    </div>
  );
} 