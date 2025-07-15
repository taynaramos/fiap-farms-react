import { Goal } from '../../entities/Goal';

export interface IGoalRepository {
  getGoals(): Promise<Goal[]>;
  create(goal: Goal): Promise<void>;
  update(goal: Goal): Promise<void>;
} 