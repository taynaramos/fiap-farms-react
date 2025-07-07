import React, { useState } from 'react';
import ProductionDashboardPage from './ProductionDashboardPage';

const MENU_ITEMS = [
  { key: 'dashboard-vendas', label: 'Dashboard de Vendas', icon: '📊' },
  { key: 'dashboard-producao', label: 'Dashboard de Produção', icon: '🚜' },
  { key: 'cadastrar-produto', label: 'Cadastrar Produto', icon: '➕' },
  { key: 'controle-estoque', label: 'Controle de Estoque e Vendas', icon: '📦' },
  { key: 'metas', label: 'Metas e Notificações', icon: '🎯' },
  { key: 'perfil', label: 'Perfil', icon: '👤' },
  { key: 'sair', label: 'Sair', icon: '🚪', color: '#f44336' },
];

export default function HomePage() {
  const [selected, setSelected] = useState('dashboard-producao');
  const [menuOpen, setMenuOpen] = useState(false);

  // Fecha o menu ao clicar fora (mobile)
  React.useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.sidebar-menu,.navbar-hamburger')) return;
      setMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menuOpen]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', position: 'relative' }}>
      {/* Navbar fixa */}
      <header style={{
        height: 56,
        background: '#4caf50',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px #0001',
      }}>
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(v => !v)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 28,
            cursor: 'pointer',
            marginRight: 18,
            outline: 'none',
          }}
          aria-label="Abrir menu"
        >
          <span style={{ display: 'inline-block', width: 28, height: 28 }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="5" width="28" height="3" rx="1.5" fill="currentColor"/>
              <rect y="12.5" width="28" height="3" rx="1.5" fill="currentColor"/>
              <rect y="20" width="28" height="3" rx="1.5" fill="currentColor"/>
            </svg>
          </span>
        </button>
        <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: 1 }}>FIAP Farms</span>
      </header>

      {/* Menu lateral */}
      <aside
        className="sidebar-menu"
        style={{
          width: 260,
          background: '#4caf50',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
          boxShadow: '2px 0 12px #0002',
          padding: '0 0 24px 0',
          position: 'fixed',
          top: 0,
          left: menuOpen ? 0 : -280,
          height: '100vh',
          zIndex: 200,
          transition: 'left 0.25s',
        }}
      >
        <div style={{ padding: '32px 24px 16px 24px', borderBottom: '1px solid #fff3', marginTop: 56 }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>🚜</div>
          <div style={{ fontWeight: 700, fontSize: 20 }}>FIAP Farms</div>
          <div style={{ fontSize: 13, color: '#e0f2f1' }}>Cooperativa de Fazendas</div>
        </div>
        <nav style={{ flex: 1, marginTop: 16, background: '#fff' }}>
          {MENU_ITEMS.map(item => (
            <div
              key={item.key}
              onClick={() => { setSelected(item.key); setMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 28px',
                cursor: 'pointer',
                color: item.color || (selected === item.key ? '#388e3c' : '#4caf50'),
                background: selected === item.key ? '#fff' : 'transparent',
                fontWeight: selected === item.key ? 700 : 500,
                borderLeft: selected === item.key ? '6px solid #4caf50' : '6px solid transparent',
                fontSize: 16,
                transition: 'all 0.2s',
                marginBottom: 2,
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay para mobile */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#0006',
            zIndex: 150,
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Conteúdo principal */}
      <main style={{ flex: 1, padding: 32, marginLeft: 0, marginTop: 56 }}>
        {selected === 'dashboard-producao' && <ProductionDashboardPage />}
        {/* Adicione outros conteúdos para as demais páginas aqui */}
      </main>
    </div>
  );
} 