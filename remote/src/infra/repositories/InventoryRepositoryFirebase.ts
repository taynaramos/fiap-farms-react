import { IInventoryRepository } from '../../domain/repositories/inventory/IInventoryRepository';
import { Inventory } from '../../domain/entities/Inventory';
import { db } from 'shared/firebase';
import { collection, getDocs, addDoc, orderBy, query, doc, updateDoc } from 'firebase/firestore';

export class InventoryRepositoryFirebase implements IInventoryRepository {
  async getInventory(): Promise<Inventory[]> {
    const q = query(collection(db, 'inventory'), orderBy('lastUpdated', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => Inventory.fromFirestore(doc.data(), doc.id));
  }

  async createInventory(item: Omit<Inventory, 'id'>): Promise<void> {
    await addDoc(collection(db, 'inventory'), {
      productId: item.productId,
      productName: item.productName,
      productionBatchId: item.productionBatchId ?? null,
      availableQuantity: item.availableQuantity,
      soldQuantity: item.soldQuantity,
      unitOfMeasure: item.unitOfMeasure,
      estimatedCostPerUnit: item.estimatedCostPerUnit,
      lastUpdated: item.lastUpdated,
      createdBy: item.createdBy
    });
  }

  async updateInventoryQuantity(productId: string, quantitySold: number): Promise<void> {
    const q = query(collection(db, 'inventory'));
    const querySnapshot = await getDocs(q);
    const docRef = querySnapshot.docs.find(doc => doc.data().productId === productId)?.ref;
    if (!docRef) throw new Error('Estoque não encontrado para o produto');
    const data = querySnapshot.docs.find(doc => doc.data().productId === productId)?.data();
    const newAvailable = (data?.availableQuantity || 0) - quantitySold;
    const newSold = (data?.soldQuantity || 0) + quantitySold;
    await updateDoc(docRef, {
      availableQuantity: newAvailable,
      soldQuantity: newSold,
      lastUpdated: new Date()
    });
  }
} 