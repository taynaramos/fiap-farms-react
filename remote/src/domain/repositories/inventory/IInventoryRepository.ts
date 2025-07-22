import { Inventory } from '../../entities/Inventory';

export interface IInventoryRepository {
  getInventory(): Promise<Inventory[]>;
  createInventory(item: Omit<Inventory, 'id'>): Promise<void>;
  updateInventoryQuantity(productId: string, quantitySold: number): Promise<void>;
} 