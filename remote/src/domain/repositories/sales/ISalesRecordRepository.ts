import { SalesRecord } from '../../entities/SalesRecord';

export interface ISalesRecordRepository {
  getSalesRecords(): Promise<SalesRecord[]>;
  createSalesRecord(sale: Omit<SalesRecord, 'id'>): Promise<void>;
} 