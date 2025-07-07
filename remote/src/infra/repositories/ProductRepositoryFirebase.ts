import { IProductRepository } from '../../domain/repositories/product/IProductRepository';
import { Product } from '../../domain/entities/Product';
import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

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
} 