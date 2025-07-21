import { IInventoryRepository } from '../../repositories/inventory/IInventoryRepository';
import { Inventory } from '../../entities/Inventory';

export class CreateInventoryUseCase {
  constructor(private repo: IInventoryRepository) {}

  async execute(item: Omit<Inventory, 'id'>): Promise<void> {
    return this.repo.createInventory(item);
  }
} 