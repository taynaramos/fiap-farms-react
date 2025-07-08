import { Product } from '../../entities/Product';

export interface IProductRepository {
  getProducts(): Promise<Product[]>;
  create(product: Product): Promise<void>;
} 