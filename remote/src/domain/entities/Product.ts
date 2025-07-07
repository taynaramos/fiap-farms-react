export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public category: string,
    public unitOfMeasure: string,
    public estimatedCostPerUnit: number,
    public createdAt: any,
    public createdBy: string,
    public isActive: boolean
  ) {}

  static fromFirestore(data: any, id: string): Product {
    return new Product(
      id,
      data.name,
      data.description,
      data.category,
      data.unitOfMeasure,
      data.estimatedCostPerUnit,
      data.createdAt,
      data.createdBy,
      data.isActive
    );
  }
} 