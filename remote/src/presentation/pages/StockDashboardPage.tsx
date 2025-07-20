import { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Typography, List } from '@mui/material';
import CreateStockPage from './CreateStockPage';
import CreateSalePage from './CreateSalePage';
import AddIcon from '@mui/icons-material/Add';

export default function StockDashboardPage() {
  const [showCreate, setShowCreate] = useState(false);

  const mockData = [
    { id: 1, nome: 'Tomate', disponivel: '0.0 kg', vendido: '120.0 kg', preco: 1.00, totalVendido: 120.00 },
    { id: 2, nome: 'Batata', disponivel: '900.0 kg', vendido: '', preco: 2.00, totalVendido: 0 },
    { id: 3, nome: 'Cenoura', disponivel: '0.0 kg', vendido: '1400.0 kg', preco: 5.00, totalVendido: 7000.00 },
    { id: 4, nome: 'Grão de bico', disponivel: '200.0 kg', vendido: '', preco: 5.00, totalVendido: 0 },
    { id: 5, nome: 'Couve', disponivel: '200.0 kg', vendido: '', preco: 2.00, totalVendido: 0 },
    { id: 6, nome: 'Milho', disponivel: '800.0 kg', vendido: '', preco: 5.00, totalVendido: 0 },
    { id: 7, nome: 'Repolho', disponivel: '200.0 kg', vendido: '', preco: 5.00, totalVendido: 0 },
    { id: 8, nome: 'Alface', disponivel: '200.0 kg', vendido: '', preco: 5.00, totalVendido: 0 },
  ];

  const handleAddStock = () => {
    setShowCreate(true);
  };

  return (
    <div style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
      {showCreate ? (
        <div style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
          <CreateSalePage />
          <CreateStockPage />
        </div>
      ) : (
        <div>
          <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h1">Estoque Atual</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddStock}
                sx={{ borderRadius: '20px', textTransform: 'none' }}
              >
                Adicionar ao Estoque
              </Button>
            </Box>

            <List sx={{ bgcolor: 'background.paper' }}>
              {mockData.map((item) => (
                <Card key={item.id} sx={{ mb: 2, borderRadius: '12px' }}>
                  <CardContent>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '60px 1fr 2fr 1fr', gap: 2, alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          bgcolor: '#4CAF50',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.id}
                      </Box>
                      <Typography variant="subtitle1" component="div">
                        {item.nome}
                      </Typography>
                      <Box>
                        <Typography color="text.secondary">
                          Disponível: {item.disponivel}
                        </Typography>
                        {item.vendido && (
                          <Typography color="text.secondary">
                            Vendido: {item.vendido}
                          </Typography>
                        )}
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography color="success.main">
                          R$ {item.preco.toFixed(2)}
                        </Typography>
                        <Typography color="text.secondary" variant="caption">
                          por kg
                        </Typography>
                        {item.totalVendido > 0 && (
                          <Typography color="text.secondary" display="block">
                            Total vendido: R$ {item.totalVendido.toFixed(2)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Container>
        </div>
      )}
    </div>
  );
} 