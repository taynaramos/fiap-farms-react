import { IProductRepository } from '../../domain/repositories/product/IProductRepository';
import { Product } from '../../domain/entities/Product';
import { db } from 'shared/firebase';
import { collection, getDocs, query, where, orderBy, addDoc } from 'firebase/firestore';

export class ProductRepositoryFirebase implements IProductRepository {
  async getProducts(): Promise<Product[]> {
    try {
      const q = query(
        collection(db, 'products'),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => Product.fromFirestore(doc.data(), doc.id));
    } catch (e) {
      throw new Error('Erro ao buscar produtos: ' + e);
    }
  }

  async create(product: Product): Promise<void> {
    try {
      await addDoc(collection(db, 'products'), {
        name: product.name,
        description: product.description,
        category: product.category,
        unitOfMeasure: product.unitOfMeasure,
        estimatedCostPerUnit: product.estimatedCostPerUnit,
        createdAt: product.createdAt,
        createdBy: product.createdBy,
        isActive: product.isActive,
      });
    } catch (e) {
      throw new Error('Erro ao criar produto: ' + e);
    }
  }
} 