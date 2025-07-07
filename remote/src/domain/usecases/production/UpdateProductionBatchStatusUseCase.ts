import { IProductionBatchRepository } from '../../repositories/IProductionBatchRepository';
import { StatusKey } from '../../enums/StatusKey';

export class UpdateProductionBatchStatusUseCase {
  constructor(private repo: IProductionBatchRepository) {}

  async execute(id: string, status: StatusKey): Promise<void> {
    await this.repo.updateStatus(id, status, new Date());
  }
} 