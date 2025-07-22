import { ISalesRecordRepository } from '../../repositories/sales/ISalesRecordRepository';
import { SalesRecord } from '../../entities/SalesRecord';

export class CreateSalesRecordUseCase {
  constructor(private repo: ISalesRecordRepository) {}

  async execute(sale: Omit<SalesRecord, 'id'>): Promise<void> {
    return this.repo.createSalesRecord(sale);
  }
} 