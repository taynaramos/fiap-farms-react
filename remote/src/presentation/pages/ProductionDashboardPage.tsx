import { useEffect, useState } from 'react';
import { GetProductionBatchesUseCase } from '../../domain/usecases/production/GetProductionBatchesUseCase';
import { ProductionBatchRepositoryFirebase } from '../../infra/repositories/ProductionBatchRepositoryFirebase';
import { StatusKey } from '../../domain/enums/StatusKey';
import { ProductionBatch } from '../../domain/entities/ProductionBatch';
import DashboardCards from '../components/productionDashboard/DashboardCards';
import StatusFilters from '../components/productionDashboard/StatusFilters';
import ProductionBatchList from '../components/productionDashboard/ProductionBatchList';

const STATUS_LABELS: { key: StatusKey; label: string; color: string; icon: string }[] = [
    { key: StatusKey.PLANEJADO, label: 'Planejado', color: '#2196f3', icon: '📋🕒' },
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
  });
  const [batches, setBatches] = useState<ProductionBatch[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchBatches = () => {
    const repo = new ProductionBatchRepositoryFirebase();
    const getBatchesUseCase = new GetProductionBatchesUseCase(repo);
    getBatchesUseCase.execute().then(batchesList => {
      const statusCounts: Record<StatusKey, number> = {
        [StatusKey.PLANEJADO]: 0,
        [StatusKey.AGUARDANDO]: 0,
        [StatusKey.EM_PRODUCAO]: 0,
        [StatusKey.COLHIDO]: 0,
      };
      batchesList.forEach(batch => {
        if (statusCounts[batch.status] !== undefined) {
          statusCounts[batch.status]++;
        }
      });
      setCounts(statusCounts);
      setBatches(batchesList);
    });
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const filteredBatches = statusFilter === 'all'
    ? batches
    : batches.filter(batch => batch.status === statusFilter);

  return (
    <div style={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
      <DashboardCards counts={counts} statusLabels={STATUS_LABELS} />
      <StatusFilters statusFilters={STATUS_FILTERS} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      <ProductionBatchList filteredBatches={filteredBatches} statusLabels={STATUS_LABELS} onStatusChange={fetchBatches} />
    </div>
  );
} 