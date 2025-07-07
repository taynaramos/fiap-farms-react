import { StatusKey } from '../enums/StatusKey';

export class ProductionBatch {
  constructor(
    public id: string,
    public productId: string,
    public productName: string,
    public status: StatusKey,
    public estimatedQuantity: number,
    public farmId?: string,
    public startDate?: any,
    public estimatedEndDate?: any,
    public actualHarvestDate?: any,
    public actualQuantity?: number,
    public notes?: string,
    public createdAt?: any,
    public createdBy?: string,
    public lastUpdatedAt?: any,
  ) {}
} 