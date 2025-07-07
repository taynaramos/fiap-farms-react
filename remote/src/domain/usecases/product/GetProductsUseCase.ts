import { IProductRepository } from '../../repositories/product/IProductRepository';
import { Product } from '../../entities/Product';

export class GetProductsUseCase {
  constructor(private repo: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.repo.getProducts();
  }
} 