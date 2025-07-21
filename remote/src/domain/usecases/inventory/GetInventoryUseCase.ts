import { IInventoryRepository } from '../../repositories/inventory/IInventoryRepository';
import { Inventory } from '../../entities/Inventory';

export class GetInventoryUseCase {
  constructor(private repo: IInventoryRepository) {}

  async execute(): Promise<Inventory[]> {
    return this.repo.getInventory();
  }
} 