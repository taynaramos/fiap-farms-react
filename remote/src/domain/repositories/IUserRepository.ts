import { User } from '../entities/User';

export interface IUserRepository {
  create(user: User, password: string): Promise<void>;
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  list(): Promise<User[]>;
} 