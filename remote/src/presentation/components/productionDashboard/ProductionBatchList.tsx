import React from 'react';
import { ProductionBatch } from '../../../domain/entities/ProductionBatch';
import { StatusKey } from '../../../domain/enums/StatusKey';
import { ProductionBatchRepositoryFirebase } from '../../../infra/repositories/ProductionBatchRepositoryFirebase';
import { UpdateProductionBatchStatusUseCase } from '../../../domain/usecases/production/UpdateProductionBatchStatusUseCase';

interface ProductionBatchListProps {
  filteredBatches: ProductionBatch[];
  statusLabels: { key: StatusKey; label: string; color: string; icon: string }[];
  onStatusChange?: () => void;
}

function getNextStatus(current: StatusKey): StatusKey | null {
  switch (current) {
    case StatusKey.PLANEJADO:
      return StatusKey.AGUARDANDO;
    case StatusKey.AGUARDANDO:
      return StatusKey.EM_PRODUCAO;
    case StatusKey.EM_PRODUCAO:
      return StatusKey.COLHIDO;
    default:
      return null;
  }
}

export default function ProductionBatchList({ filteredBatches, statusLabels, onStatusChange }: ProductionBatchListProps) {
  const handleAdvanceStatus = async (batch: ProductionBatch) => {
    const nextStatus = getNextStatus(batch.status);
    if (!nextStatus) return;
    const repo = new ProductionBatchRepositoryFirebase();
    const useCase = new UpdateProductionBatchStatusUseCase(repo);
    await useCase.execute(batch.id, nextStatus);
    if (onStatusChange) onStatusChange();
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h3 style={{ margin: '24px 0 12px 0', fontWeight: 700 }}>Lotes de Produção ({filteredBatches.length})</h3>
      {filteredBatches.map(batch => {
        const nextStatus = getNextStatus(batch.status);
        const nextStatusLabel = nextStatus ? statusLabels.find(s => s.key === nextStatus) : undefined;
        return (
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
            {nextStatus && (
              <button
                onClick={() => handleAdvanceStatus(batch)}
                style={{
                  marginTop: 8,
                  alignSelf: 'flex-end',
                  background: nextStatusLabel?.color || '#4caf50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '6px 18px',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #0001',
                  transition: 'all 0.2s',
                }}
              >
                Marcar como {nextStatusLabel?.label}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
} 