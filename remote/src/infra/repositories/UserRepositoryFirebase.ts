import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { db } from '../firebase';
import { collection, setDoc, getDoc, getDocs, query, where, doc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export class UserRepositoryFirebase implements IUserRepository {
  async create(user: User, password: string): Promise<void> {
    const cred = await createUserWithEmailAndPassword(auth, user.email, password);
    await setDoc(doc(db, 'users', cred.user.uid), {
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      createdAt: serverTimestamp()
    });
  }

  async getById(id: string): Promise<User | null> {
    const ref = doc(db, 'users', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return User.fromFirestore(snap.data(), snap.id);
  }

  async getByEmail(email: string): Promise<User | null> {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return User.fromFirestore(snap.docs[0].data(), snap.docs[0].id);
  }

  async list(): Promise<User[]> {
    const snap = await getDocs(collection(db, 'users'));
    return snap.docs.map(doc => User.fromFirestore(doc.data(), doc.id));
  }
} 