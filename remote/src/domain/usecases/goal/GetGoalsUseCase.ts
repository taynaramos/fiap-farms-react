import { Goal } from '../../entities/Goal';
import { IGoalRepository } from '../../../domain/repositories/goal/IGoalRepository';

export class GetGoalsUseCase {
  constructor(private goalRepository: IGoalRepository) {}

  async execute(): Promise<Goal[]> {
    return this.goalRepository.getGoals();
  }
} 