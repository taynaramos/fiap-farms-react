import { ISalesRecordRepository } from '../../domain/repositories/sales/ISalesRecordRepository';
import { SalesRecord } from '../../domain/entities/SalesRecord';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export class SalesRecordRepositoryFirebase implements ISalesRecordRepository {
  async getSalesRecords(): Promise<SalesRecord[]> {
    const q = query(collection(db, 'salesRecords'), orderBy('saleDate', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => SalesRecord.fromFirestore(doc.data(), doc.id));
  }
} 