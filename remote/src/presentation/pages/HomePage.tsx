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

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Menu lateral */}
      <aside style={{
        width: 260,
        background: '#4caf50',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
        boxShadow: '2px 0 12px #0002',
        padding: '0 0 24px 0',
      }}>
        <div style={{ padding: '32px 24px 16px 24px', borderBottom: '1px solid #fff3' }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>🚜</div>
          <div style={{ fontWeight: 700, fontSize: 20 }}>FIAP Farms</div>
          <div style={{ fontSize: 13, color: '#e0f2f1' }}>Cooperativa de Fazendas</div>
        </div>
        <nav style={{ flex: 1, marginTop: 16 }}>
          {MENU_ITEMS.map(item => (
            <div
              key={item.key}
              onClick={() => setSelected(item.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 28px',
                cursor: 'pointer',
                color: item.color || (selected === item.key ? '#4caf50' : '#fff'),
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
      {/* Conteúdo principal */}
      <main style={{ flex: 1, padding: 32 }}>
        {selected === 'dashboard-producao' && <ProductionDashboardPage />}
        {/* Adicione outros conteúdos para as demais páginas aqui */}
      </main>
    </div>
  );
} 