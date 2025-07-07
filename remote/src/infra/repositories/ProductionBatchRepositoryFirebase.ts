import { IProductionBatchRepository } from '../../domain/repositories/IProductionBatchRepository';
import { ProductionBatch } from '../../domain/entities/ProductionBatch';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { StatusKey } from '../../domain/enums/StatusKey';

export class ProductionBatchRepositoryFirebase implements IProductionBatchRepository {
  async getAll(): Promise<ProductionBatch[]> {
    const snapshot = await getDocs(collection(db, 'productionBatches'));
    return snapshot.docs.map(doc => new ProductionBatch(
      doc.id,
      doc.data().productId,
      doc.data().productName,
      doc.data().status as StatusKey,
      doc.data().estimatedQuantity,
      doc.data().farmId,
      doc.data().startDate,
      doc.data().estimatedEndDate,
      doc.data().actualHarvestDate,
      doc.data().actualQuantity,
      doc.data().notes,
      doc.data().createdAt,
      doc.data().createdBy,
      doc.data().lastUpdatedAt,
    ));
  }
} 