import { StatusKey } from '../../domain/enums/StatusKey';

export const STATUS_LABELS: { key: StatusKey; label: string; color: string; icon: string }[] = [
  { key: StatusKey.PLANEJADO, label: 'Planejado', color: '#2196f3', icon: '📋' },
  { key: StatusKey.AGUARDANDO, label: 'Aguardando', color: '#ff9800', icon: '⏳' },
  { key: StatusKey.EM_PRODUCAO, label: 'Em Produção', color: '#4caf50', icon: '🌱' },
  { key: StatusKey.COLHIDO, label: 'Colhido', color: '#9c27b0', icon: '✔️' },
];