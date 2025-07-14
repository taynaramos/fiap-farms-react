import { ISalesRecordRepository } from '../../repositories/sales/ISalesRecordRepository';
import { SalesRecord } from '../../entities/SalesRecord';

export class GetSalesRecordsUseCase {
  constructor(private repo: ISalesRecordRepository) {}

  async execute(): Promise<SalesRecord[]> {
    return this.repo.getSalesRecords();
  }
} 