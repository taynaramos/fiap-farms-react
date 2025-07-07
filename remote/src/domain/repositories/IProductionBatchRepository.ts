import { ProductionBatch } from '../entities/ProductionBatch';

export interface IProductionBatchRepository {
  getAll(): Promise<ProductionBatch[]>;
  // outros métodos: getById, create, update, etc.
} 