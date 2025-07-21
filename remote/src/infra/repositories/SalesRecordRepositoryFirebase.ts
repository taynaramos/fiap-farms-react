import { ISalesRecordRepository } from '../../domain/repositories/sales/ISalesRecordRepository';
import { SalesRecord } from '../../domain/entities/SalesRecord';
import { db } from 'shared/firebase';
import { collection, getDocs, orderBy, query, addDoc } from 'firebase/firestore';

export class SalesRecordRepositoryFirebase implements ISalesRecordRepository {
  async getSalesRecords(): Promise<SalesRecord[]> {
    const q = query(collection(db, 'salesRecords'), orderBy('saleDate', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => SalesRecord.fromFirestore(doc.data(), doc.id));
  }

  async createSalesRecord(sale: Omit<SalesRecord, 'id'>): Promise<void> {
    await addDoc(collection(db, 'salesRecords'), {
      productId: sale.productId,
      productName: sale.productName,
      productionBatchId: sale.productionBatchId || null,
      quantitySold: sale.quantitySold,
      unitOfMeasure: sale.unitOfMeasure,
      salePricePerUnit: sale.salePricePerUnit,
      totalSaleAmount: sale.totalSaleAmount,
      estimatedCostAtSale: sale.estimatedCostAtSale,
      calculatedProfit: sale.calculatedProfit,
      saleDate: sale.saleDate,
      clientInfo: sale.clientInfo || null,
      notes: sale.notes || null,
      createdAt: sale.createdAt,
      createdBy: sale.createdBy
    });
  }
} 