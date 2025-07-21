import React, { useState } from 'react';
import ProductionDashboardPage from './ProductionDashboardPage';
import SalesDashboardPage from './SalesDashboardPage';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, CssBaseline, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CreateProductPage from './CreateProductPage';
import CreateUserPage from './CreateUserPage';
import { useAuth } from '../../infra/firebase/AuthContext';
import StockDashboardPage from './StockDashboardPage';
import GoalsPage from './GoalsPage';
import NotificationBell from '../components/NotificationBell';
import Routes from 'shared/routes';

const drawerWidth = 260;

export default function HomePage() {
  const [selected, setSelected] = useState(Routes.paths.dashboard_producao);
  const [menuOpen, setMenuOpen] = useState(false);
  const { appUser, loading } = useAuth();

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><Typography>Carregando...</Typography></Box>;
  }

  if (!appUser) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><Typography>Usuário não autenticado</Typography></Box>;
  }

  // Monta o menu dinamicamente conforme o role
  const menuItems = [
    { key: Routes.paths.dashboard_vendas, label: 'Dashboard de Vendas', icon: '📊' },
    { key: Routes.paths.dashboard_producao, label: 'Dashboard de Produção', icon: '🚜' },
    { key: Routes.paths.cadastrar_produto, label: 'Cadastrar Produto', icon: '➕' },
    { key: Routes.paths.controle_estoque, label: 'Controle de Estoque e Vendas', icon: '📦' },
    { key: Routes.paths.metas, label: 'Metas e Notificações', icon: '🎯' },
    ...(appUser.role === 'admin' ? [{ key: Routes.paths.admin, label: 'Administração', icon: '🛡️' }] : []),
    { key: Routes.paths.sair, label: 'Sair', icon: '🚪', color: '#f44336' },
  ];

  const handleDrawerToggle = () => setMenuOpen(!menuOpen);
  const handleNavigateToGoals = () => setSelected(Routes.paths.metas);

  const drawer = (
    <Box sx={{ width: drawerWidth, bgcolor: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <List sx={{ flex: 1, bgcolor: '#fff', pt: 2 }}>
        {menuItems.map(item => (
          <ListItemButton
            key={item.key}
            selected={selected === item.key}
            onClick={() => { setSelected(item.key); setMenuOpen(false); }}
            sx={{
              color: item.color || (selected === item.key ? '#388e3c' : '#4caf50'),
              bgcolor: selected === item.key ? '#e8f5e9' : '#fff',
              fontWeight: selected === item.key ? 700 : 500,
              borderLeft: selected === item.key ? '6px solid #4caf50' : '6px solid transparent',
              fontSize: 16,
              mb: 0.5,
              pl: 3,
              pr: 2,
              borderRadius: 2,
              transition: 'all 0.2s',
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 36, fontSize: 22 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ bgcolor: '#4caf50', zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight={700} letterSpacing={1} sx={{ flexGrow: 1 }}>
            FIAP Farms
          </Typography>
          <NotificationBell onNavigateToGoals={handleNavigateToGoals} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={menuOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            borderTopRightRadius: 18, 
            borderBottomRightRadius: 18,
            top: '64px', // Altura da toolbar
            height: 'calc(100% - 64px)', // Altura total menos a toolbar
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flex: 1, p: 4, mt: 7 }}>
        {selected === Routes.paths.dashboard_vendas && <SalesDashboardPage />}
        {selected === Routes.paths.dashboard_producao && <ProductionDashboardPage />}
        {selected === Routes.paths.cadastrar_produto && <CreateProductPage />}
        {selected === Routes.paths.controle_estoque && <StockDashboardPage />}
        {selected === Routes.paths.admin && <CreateUserPage />}
        {selected === Routes.paths.metas && <GoalsPage />}
        {/* Adicione outros conteúdos para as demais páginas aqui */}
      </Box>
    </Box>
  );
} 