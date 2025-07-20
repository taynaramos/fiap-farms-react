import { useEffect, useState } from 'react';
import { ProductionBatch } from '../../domain/entities/ProductionBatch';
import { StatusKey } from '../../domain/enums/StatusKey';
import { GetProductionBatchesUseCase } from '../../domain/usecases/production/GetProductionBatchesUseCase';
import { ProductionBatchRepositoryFirebase } from '../../infra/repositories/ProductionBatchRepositoryFirebase';
import DashboardCards from '../components/productionDashboard/DashboardCards';
import ProductionBatchList from '../components/productionDashboard/ProductionBatchList';
import StatusFilters from '../components/productionDashboard/StatusFilters';
import { STATUS_LABELS } from '../const/statusLabels';
import CreateProductionBatchPage from './CreateProductionBatchPage';
import withLayoutAndAuth from './withLayoutAndAuth';

const STATUS_FILTERS = [
  { key: 'all', label: 'Todos' },
  ...STATUS_LABELS.map(({ key, label }) => ({ key, label })),
];

function ProductionDashboardPage() {
  const [counts, setCounts] = useState<Record<StatusKey, number>>({
    [StatusKey.PLANEJADO]: 0,
    [StatusKey.AGUARDANDO]: 0,
    [StatusKey.EM_PRODUCAO]: 0,
    [StatusKey.COLHIDO]: 0,
  });
  const [batches, setBatches] = useState<ProductionBatch[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreate, setShowCreate] = useState(false);

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
      {showCreate ? (
        <CreateProductionBatchPage />
      ) : (
        <div>
          <StatusFilters statusFilters={STATUS_FILTERS} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
          <ProductionBatchList filteredBatches={filteredBatches} statusLabels={STATUS_LABELS} onStatusChange={fetchBatches} onAddBatch={() => setShowCreate(true)} />
        </div>
      )}
    </div>
  );
} 

export default withLayoutAndAuth(ProductionDashboardPage)