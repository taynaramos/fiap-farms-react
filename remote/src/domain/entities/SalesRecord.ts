export class SalesRecord {
  constructor(
    public id: string,
    public productId: string,
    public productName: string,
    public productionBatchId: string | undefined,
    public quantitySold: number,
    public unitOfMeasure: string,
    public salePricePerUnit: number,
    public totalSaleAmount: number,
    public estimatedCostAtSale: number,
    public calculatedProfit: number,
    public saleDate: any,
    public clientInfo: string | undefined,
    public notes: string | undefined,
    public createdAt: any,
    public createdBy: string
  ) {}

  static fromFirestore(data: any, id: string): SalesRecord {
    return new SalesRecord(
      id,
      data.productId,
      data.productName,
      data.productionBatchId,
      data.quantitySold,
      data.unitOfMeasure,
      data.salePricePerUnit,
      data.totalSaleAmount,
      data.estimatedCostAtSale,
      data.calculatedProfit,
      data.saleDate,
      data.clientInfo,
      data.notes,
      data.createdAt,
      data.createdBy
    );
  }
} 