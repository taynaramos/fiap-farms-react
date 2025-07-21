import { useState } from 'react';
import { Box, Button, Container, Typography, Tabs, Tab } from '@mui/material';
import CreateStockPage from './CreateStockPage';
import CreateSalePage from './CreateSalePage';
import withLayoutAndAuth from './withLayoutAndAuth';
import StockProductCard from '../components/stockDashboard/ProductsList';

function StockDashboardPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [tab, setTab] = useState(0);

  // Dados mockados para teste (substitua pelos dados reais depois)
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

  // Conteúdo das abas
  const renderStockTab = () => (
    <>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Estoque Atual
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setShowCreate(true)}>
          Adicionar ao estoque
        </Button>
      </Container>
      {showCreate ? (
        <CreateStockPage />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {stockProducts.map((item, index) => (
            <StockProductCard key={index} item={item} index={index} />
          ))}
        </Box>
      )}
    </>
  );

  const renderSalesTab = () => (
    <>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Vendas
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setShowCreate(true)}>
          Registrar venda
        </Button>
      </Container>
      {showCreate ? (
        <CreateSalePage />
      ) : (
        <Typography variant="body1">Nenhuma venda registrada.</Typography>
      )}
    </>
  );

  return (
    <Box sx={{ fontFamily: 'Roboto, Arial, sans-serif', px: 3, py: 4 }}>
      <Tabs value={tab} onChange={(_, v) => { setShowCreate(false); setTab(v); }} sx={{ mb: 2 }}>
        <Tab label="Estoque" />
        <Tab label="Vendas" />
      </Tabs>
      {tab === 0 ? renderStockTab() : renderSalesTab()}
    </Box>
  );
}

export default withLayoutAndAuth(StockDashboardPage);