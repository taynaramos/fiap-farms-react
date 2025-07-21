export class Inventory {
  constructor(
    public id: string,
    public productId: string,
    public productName: string,
    public productionBatchId: string | null,
    public availableQuantity: number,
    public soldQuantity: number,
    public unitOfMeasure: string,
    public estimatedCostPerUnit: number,
    public lastUpdated: any,
    public createdBy: string
  ) {}

  static fromFirestore(data: any, id: string): Inventory {
    return new Inventory(
      id,
      data.productId,
      data.productName,
      data.productionBatchId ?? null,
      data.availableQuantity,
      data.soldQuantity,
      data.unitOfMeasure,
      data.estimatedCostPerUnit,
      data.lastUpdated,
      data.createdBy
    );
  }
} 