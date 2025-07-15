import { SalesRecord } from '../../entities/SalesRecord';

export interface ISalesRecordRepository {
  getSalesRecords(): Promise<SalesRecord[]>;
} 