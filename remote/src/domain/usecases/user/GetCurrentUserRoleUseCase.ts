import { UserRepositoryFirebase } from '../../../infra/repositories/UserRepositoryFirebase';
import { auth } from '../../../infra/firebase';

export async function getCurrentUserRole(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  const repo = new UserRepositoryFirebase();
  const userData = await repo.getById(user.uid);
  return userData?.role || null;
} 