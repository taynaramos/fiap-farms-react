import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Tabs, Tab } from '@mui/material';
import CreateStockPage from './CreateStockPage';
import CreateSalePage from './CreateSalePage';
import withLayoutAndAuth from './withLayoutAndAuth';
import StockProductCard from '../components/stockDashboard/StockProductCard';
import SalesRegisterCard from '../components/stockDashboard/SalesRegisterCard';
import { SalesRecord } from '../../domain/entities/SalesRecord';
import { GetSalesRecordsUseCase } from '../../domain/usecases/sales/GetSalesRecordsUseCase';
import { SalesRecordRepositoryFirebase } from '../../infra/repositories/SalesRecordRepositoryFirebase';
import { Inventory } from '../../domain/entities/Inventory';
import { GetInventoryUseCase } from '../../domain/usecases/inventory/GetInventoryUseCase';
import { InventoryRepositoryFirebase } from '../../infra/repositories/InventoryRepositoryFirebase';

function StockDashboardPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [tab, setTab] = useState(0);
  const [sales, setSales] = useState<SalesRecord[]>([]);
  const [loadingSales, setLoadingSales] = useState(true);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loadingInventory, setLoadingInventory] = useState(true);

  useEffect(() => {
    async function fetchSales() {
      setLoadingSales(true);
      const repo = new SalesRecordRepositoryFirebase();
      const useCase = new GetSalesRecordsUseCase(repo);
      const salesList = await useCase.execute();
      setSales(salesList);
      setLoadingSales(false);
    }
    if (!showCreate && tab === 1) {
      fetchSales();
    }
  }, [showCreate, tab]);

  useEffect(() => {
    async function fetchInventory() {
      setLoadingInventory(true);
      const repo = new InventoryRepositoryFirebase();
      const useCase = new GetInventoryUseCase(repo);
      const inventoryList = await useCase.execute();
      setInventory(inventoryList);
      setLoadingInventory(false);
    }
    if (!showCreate && tab === 0) {
      fetchInventory();
    }
  }, [showCreate, tab]);

  const renderStockTab = () => (
    <>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          mt: 4,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Estoque Atual
        </Typography>
        {showCreate ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowCreate(false)}
          >
            Voltar
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowCreate(true)}
          >
            Adicionar ao estoque
          </Button>
        )}
      </Container>
      {showCreate ? (
        <CreateStockPage />
      ) : loadingInventory ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <span>Carregando estoque...</span>
        </Box>
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
          {inventory.length === 0 ? (
            <Typography variant="body2" color="text.secondary">Nenhum item de estoque cadastrado.</Typography>
          ) : (
            inventory.map((item, index) => (
              <StockProductCard key={item.id} item={item} index={index} />
            ))
          )}
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
          mt: 4,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Vendas realizadas
        </Typography>
        {showCreate ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowCreate(false)}
          >
            Voltar
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowCreate(true)}
          >
            Registrar venda
          </Button>
        )}
      </Container>
      {showCreate ? (
        <CreateSalePage />
      ) : loadingSales ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <span>Carregando vendas...</span>
        </Box>
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
          {sales.length === 0 ? (
            <Typography variant="body2" color="text.secondary">Nenhuma venda registrada.</Typography>
          ) : (
            sales.map((sale, index) => (
              <SalesRegisterCard key={sale.id} sale={sale} index={index} />
            ))
          )}
        </Box>
      )}
    </>
  );

  return (
    <Box sx={{ fontFamily: 'Roboto, Arial, sans-serif', m: 0, p: 0 }}>
      <Box
        sx={{
          bgcolor: '#4caf50', // verde igual ao header
          borderRadius: 0,
          px: 0,
          py: 0,
          mt: 8,
          ml: -4,
          width: '100%',
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: 0,
          zIndex: 20,
        }}
      >
        <Tabs
          value={tab}
          onChange={(_event: React.SyntheticEvent, v: number) => { setShowCreate(false); setTab(v); }}
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
                textShadow: '0 1px 8px #4caf50',
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
                textShadow: '0 1px 8px #4caf50',
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