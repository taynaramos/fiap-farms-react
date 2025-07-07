import { IProductionBatchRepository } from '../../repositories/production/IProductionBatchRepository';
import { ProductionBatch } from '../../entities/ProductionBatch';

export class CreateProductionBatchUseCase {
  constructor(private repo: IProductionBatchRepository) {}

  async execute(batch: Omit<ProductionBatch, 'id'>): Promise<ProductionBatch> {
    return this.repo.createProductionBatch(batch);
  }
} 