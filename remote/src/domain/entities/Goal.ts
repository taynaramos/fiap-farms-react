export interface Goal {
  id?: string; // ID do documento Firestore
  name: string;
  type: 'vendas' | 'producao';
  entityId?: string;
  targetValue: number;
  targetUnit: string;
  currentValue: number;
  startDate: Date;
  endDate: Date;
  status: 'ativa' | 'atingida' | 'expirada' | 'cancelada';
  createdAt: Date;
  createdBy: string;
  achievedAt?: Date;
} 