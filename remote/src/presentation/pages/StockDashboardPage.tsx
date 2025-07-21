import { useState } from 'react';
import { Box, Button, Container, Typography, Tabs, Tab } from '@mui/material';
import CreateStockPage from './CreateStockPage';
import CreateSalePage from './CreateSalePage';
import withLayoutAndAuth from './withLayoutAndAuth';
import StockProductCard from '../components/stockDashboard/ProductsList';

function StockDashboardPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [tab, setTab] = useState(0);

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
    {
      productName: "Alface Crespa",
      estimatedQuantity: 100,
      actualQuantity: 90,
      estimatedCostPerUnit: 0.80,
    },
    {
      productName: "Alface Crespa",
      estimatedQuantity: 100,
      actualQuantity: 90,
      estimatedCostPerUnit: 0.80,
    },
    {
      productName: "Alface Crespa",
      estimatedQuantity: 100,
      actualQuantity: 90,
      estimatedCostPerUnit: 0.80,
    },
  ];

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
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            mt: 2,
          }}
        >
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
    <Box sx={{ fontFamily: 'Roboto, Arial, sans-serif', m: 0, p: 0 }}>
      <Box
        sx={{
          bgcolor: '#43a047', // verde igual ao header
          borderRadius: 0,
          px: 2,
          py: 0,
          m: 0,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => { setShowCreate(false); setTab(v); }}
          TabIndicatorProps={{ style: { background: '#fff', height: 4, borderRadius: 2 } }}
        >
          <Tab
            label="Estoque"
            sx={{
              color: '#fff',
              fontWeight: 600,
              mx: 2,
              '&.Mui-selected': {
                color: '#fff',
                textShadow: '0 1px 8px #388e3c',
              },
            }}
          />
          <Tab
            label="Vendas"
            sx={{
              color: '#fff',
              fontWeight: 600,
              mx: 2,
              '&.Mui-selected': {
                color: '#fff',
                textShadow: '0 1px 8px #388e3c',
              },
            }}
          />
        </Tabs>
      </Box>
      <Box sx={{ px: 3, py: 4 }}>
        {tab === 0 ? renderStockTab() : renderSalesTab()}
      </Box>
    </Box>
  );
}

export default withLayoutAndAuth(StockDashboardPage);