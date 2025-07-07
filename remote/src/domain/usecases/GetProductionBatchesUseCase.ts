import { IProductionBatchRepository } from '../repositories/IProductionBatchRepository';
import { ProductionBatch } from '../entities/ProductionBatch';

export class GetProductionBatchesUseCase {
  constructor(private repo: IProductionBatchRepository) {}

  async execute(): Promise<ProductionBatch[]> {
    return this.repo.getAll();
  }
} 