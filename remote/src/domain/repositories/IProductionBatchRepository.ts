import { ProductionBatch } from '../entities/ProductionBatch';
import { StatusKey } from '../enums/StatusKey';

export interface IProductionBatchRepository {
  getAll(): Promise<ProductionBatch[]>;
  updateStatus(id: string, status: StatusKey, lastUpdatedAt: Date): Promise<void>;
  // outros métodos: getById, create, update, etc.
} 