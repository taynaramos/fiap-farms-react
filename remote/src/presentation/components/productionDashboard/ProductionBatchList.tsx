import React from 'react';
import { ProductionBatch } from '../../../domain/entities/ProductionBatch';
import { StatusKey } from '../../../domain/enums/StatusKey';

interface ProductionBatchListProps {
  filteredBatches: ProductionBatch[];
  statusLabels: { key: StatusKey; label: string; color: string; icon: string }[];
}

export default function ProductionBatchList({ filteredBatches, statusLabels }: ProductionBatchListProps) {
  return (
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
              {statusLabels.find(s => s.key === batch.status)?.label || batch.status}
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
  );
} 