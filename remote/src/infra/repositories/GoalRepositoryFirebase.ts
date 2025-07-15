import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Goal } from '../../domain/entities/Goal';
import { IGoalRepository } from '../../domain/repositories/goal/IGoalRepository';

export class GoalRepositoryFirebase implements IGoalRepository {
  private goalsCollection = collection(db, 'goals');

  async getGoals(): Promise<Goal[]> {
    const snapshot = await getDocs(this.goalsCollection);
    return snapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        startDate: data.startDate?.toDate ? data.startDate.toDate() : new Date(data.startDate),
        endDate: data.endDate?.toDate ? data.endDate.toDate() : new Date(data.endDate),
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
        achievedAt: data.achievedAt?.toDate ? data.achievedAt.toDate() : data.achievedAt ? new Date(data.achievedAt) : undefined,
      } as Goal;
    });
  }

  async create(goal: Goal): Promise<void> {
    const { id, ...goalData } = goal;
    await addDoc(this.goalsCollection, goalData);
  }

  async update(goal: Goal): Promise<void> {
    if (!goal.id) throw new Error('Goal ID é obrigatório para atualizar');
    const goalRef = doc(this.goalsCollection, goal.id);
    const { id, ...goalData } = goal;
    await updateDoc(goalRef, goalData);
  }

  async getActiveGoalsByProduct(productId: string): Promise<Goal[]> {
    const snapshot = await getDocs(this.goalsCollection);
    return snapshot.docs
      .map(docSnap => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          startDate: data.startDate,
          endDate: data.endDate,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
          achievedAt: data.achievedAt?.toDate ? data.achievedAt.toDate() : data.achievedAt ? new Date(data.achievedAt) : undefined,
        } as Goal;
      })
      .filter(goal => goal.entityId === productId && goal.status === 'ativa');
  }
} 