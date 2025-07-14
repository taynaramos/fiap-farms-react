import { Goal } from '../../entities/Goal';
import { IGoalRepository } from '../../../domain/repositories/goal/IGoalRepository';

export class CreateGoalUseCase {
  constructor(private goalRepository: IGoalRepository) {}

  async execute(goal: Goal): Promise<void> {
    await this.goalRepository.create(goal);
  }
} 