import { auth } from 'shared/firebase';
import { UserRepositoryFirebase } from '../../../infra/repositories/UserRepositoryFirebase';

export async function getCurrentUserRole(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  const repo = new UserRepositoryFirebase();
  const userData = await repo.getById(user.uid);
  return userData?.role || null;
} 