import React, { useState, useEffect } from 'react';
import { IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Goal, GoalStatus } from '../../domain/entities/Goal';
import { GoalRepositoryFirebase } from '../../infra/repositories/GoalRepositoryFirebase';
import { GetGoalsUseCase } from '../../domain/usecases/goal/GetGoalsUseCase';

interface NotificationBellProps {
  onNavigateToGoals: () => void;
}

export default function NotificationBell({ onNavigateToGoals }: NotificationBellProps) {
  const [notificationsCount, setNotificationsCount] = useState(0);

  // Buscar metas atingidas para notificações
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const repo = new GoalRepositoryFirebase();
        const useCase = new GetGoalsUseCase(repo);
        const goals = await useCase.execute();
        const atingidas = goals.filter((g: Goal) => g.status === GoalStatus.ATINGIDA && !g.achievedAt);
        setNotificationsCount(atingidas.length);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      }
    };

    fetchNotifications();
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IconButton
      color="inherit"
      aria-label="notificações"
      onClick={onNavigateToGoals}
      sx={{ ml: 2 }}
    >
      <Badge badgeContent={notificationsCount} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
} 