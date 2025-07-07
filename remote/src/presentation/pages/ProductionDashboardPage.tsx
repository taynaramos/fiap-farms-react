import { useEffect, useState } from 'react';
import { GetProductionBatchesUseCase } from '../../domain/usecases/GetProductionBatchesUseCase';
import { ProductionBatchRepositoryFirebase } from '../../infra/repositories/ProductionBatchRepositoryFirebase';
import { StatusKey } from '../../domain/enums/StatusKey';
import { ProductionBatch } from '../../domain/entities/ProductionBatch';

const STATUS_LABELS: { key: StatusKey; label: string; color: string; icon: string }[] = [
    { key: StatusKey.PLANEJADO, label: 'Planejado 11', color: '#2196f3', icon: '📋🕒' },
    { key: StatusKey.AGUARDANDO, label: 'Aguardando', color: '#ff9800', icon: '🟡💬' },
    { key: StatusKey.EM_PRODUCAO, label: 'Em Produção', color: '#4caf50', icon: '🌱🚜' },
    { key: StatusKey.COLHIDO, label: 'Colhido', color: '#9c27b0', icon: '🟢✔️' },
];

const STATUS_FILTERS = [
  { key: 'all', label: 'Todos' },
  ...STATUS_LABELS.map(({ key, label }) => ({ key, label })),
];

export default function ProductionDashboardPage() {
  const [counts, setCounts] = useState<Record<StatusKey, number>>({
    [StatusKey.PLANEJADO]: 0,
    [StatusKey.AGUARDANDO]: 0,
    [StatusKey.EM_PRODUCAO]: 0,
    [StatusKey.COLHIDO]: 0,
    [StatusKey.CANCELADO]: 0,
  });
  const [batches, setBatches] = useState<ProductionBatch[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const repo = new ProductionBatchRepositoryFirebase();
    const getBatchesUseCase = new GetProductionBatchesUseCase(repo);
    getBatchesUseCase.execute().then(batchesList => {
      const statusCounts: Record<StatusKey, number> = {
        [StatusKey.PLANEJADO]: 0,
        [StatusKey.AGUARDANDO]: 0,
        [StatusKey.EM_PRODUCAO]: 0,
        [StatusKey.COLHIDO]: 0,
        [StatusKey.CANCELADO]: 0,
      };
      batchesList.forEach(batch => {
        if (statusCounts[batch.status] !== undefined) {
          statusCounts[batch.status]++;
        }
      });
      setCounts(statusCounts);
      setBatches(batchesList);
    });
  }, []);

  const filteredBatches = statusFilter === 'all'
    ? batches
    : batches.filter(batch => batch.status === statusFilter);

    return (
        <div style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
          {/* Cards do Dashboard */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', marginTop: 40 }}>
            {STATUS_LABELS.map(({ key, label, color, icon }) => (
              <div key={key} style={{
                background: '#faf7fa',
                borderRadius: 16,
                boxShadow: '0 4px 12px #0001',
                width: 240,
                height: 150,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontSize: 32, color, fontWeight: 700 }}>{counts[key]}</div>
                <div style={{ fontSize: 18, color: '#444', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
    
          {/* Filtros por status */}
          <div style={{ display: 'flex', gap: 12, margin: '32px 0 16px 0', justifyContent: 'center', flexWrap: 'wrap' }}>
            {STATUS_FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 8,
                  border: statusFilter === key ? '2px solid var(--primary-500)' : '1px solid #ccc',
                  background: statusFilter === key ? 'var(--primary-50)' : '#fff',
                  color: statusFilter === key ? 'var(--primary-700)' : '#333',
                  fontWeight: 500,
                  fontSize: 15,
                  cursor: 'pointer',
                  boxShadow: statusFilter === key ? '0 2px 8px #0001' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {label}
              </button>
            ))}
          </div>
    
          {/* Lista de Lotes filtrados (apenas estrutura, sem estilização avançada) */}
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h3 style={{ margin: '24px 0 12px 0', fontWeight: 700 }}>Lotes de Produção ({filteredBatches.length})</h3>
            {filteredBatches.map(batch => (
              <div key={batch.id} style={{
                background: '#faf7fa',
                borderRadius: 12,
                boxShadow: '0 2px 8px #0001',
                padding: 18,
                marginBottom: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>{batch.productName}</div>
                  <span style={{
                    background: 'var(--grey-light)',
                    color: `var(--status-${batch.status.toLowerCase()})`,
                    borderRadius: 8,
                    padding: '4px 14px',
                    fontWeight: 600,
                    fontSize: 14,
                    marginLeft: 8,
                  }}>
                    {STATUS_LABELS.find(s => s.key === batch.status)?.label || batch.status}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#888' }}>
                  Início: {batch.startDate?.toDate?.().toLocaleDateString?.() || '-'} &nbsp;|
                  Colheita: {batch.estimatedEndDate?.toDate?.().toLocaleDateString?.() || '-'}
                </div>
                <div style={{ fontSize: 13, color: '#888' }}>
                  Estimado: {batch.estimatedQuantity} kg
                </div>
              </div>
            ))}
          </div>
        </div>
      );
} 