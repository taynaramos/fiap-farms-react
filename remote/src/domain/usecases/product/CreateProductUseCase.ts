import { Product } from '../../entities/Product';
import { IProductRepository } from '../../../domain/repositories/product/IProductRepository';

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(product: Product): Promise<void> {
    await this.productRepository.create(product);
  }
} 