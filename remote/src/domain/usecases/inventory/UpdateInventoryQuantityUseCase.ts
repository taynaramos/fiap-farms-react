import { IInventoryRepository } from '../../repositories/inventory/IInventoryRepository';

export class UpdateInventoryQuantityUseCase {
  constructor(private repo: IInventoryRepository) {}

  async execute(productId: string, quantitySold: number): Promise<void> {
    return this.repo.updateInventoryQuantity(productId, quantitySold);
  }
} 