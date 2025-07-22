import { IGoalRepository } from '../../repositories/goal/IGoalRepository';
import { Goal, GoalStatus } from '../../entities/Goal';
import { UNITS } from '../../../presentation/const/units';

export class UpdateGoalCurrentValueUseCase {
  constructor(private goalRepository: IGoalRepository) {}

  /**
   * Atualiza o progresso das metas de vendas para o produto vendido.
   * Retorna um array de metas atingidas (após update) para notificação.
   */
  async execute(params: { productId: string; quantitySold: number; totalSaleAmount: number; }): Promise<Goal[]> {
    const allGoals = await this.goalRepository.getGoals();
    const now = new Date();
    const metasAtivas = allGoals.filter(goal =>
      goal.type === 'vendas' &&
      goal.entityId === params.productId &&
      goal.status === GoalStatus.ATIVA &&
      now >= new Date(goal.startDate) &&
      now <= new Date(goal.endDate)
    );
    const metasAtingidas: Goal[] = [];
    for (const meta of metasAtivas) {
      let novoValor = meta.currentValue;
      const isUnit = UNITS.some(u => u.value === meta.targetUnit);
      console.log("isUnit", isUnit)
      if (isUnit) {
        novoValor += params.quantitySold;
      } else if (meta.targetUnit === 'R$') {
        novoValor += params.totalSaleAmount;
      }
      let status = meta.status;
      let achievedAt = meta.achievedAt;
      if (novoValor >= meta.targetValue) {
        status = GoalStatus.ATINGIDA;
        achievedAt = new Date();
        metasAtingidas.push({ ...meta, currentValue: novoValor, status, achievedAt });
      }
      // Remover achievedAt se undefined
      const goalToUpdate: any = { ...meta, currentValue: novoValor, status };
      if (achievedAt) {
        goalToUpdate.achievedAt = achievedAt;
      } else {
        delete goalToUpdate.achievedAt;
      }
      await this.goalRepository.update(goalToUpdate);
    }
    return metasAtingidas;
  }
} 