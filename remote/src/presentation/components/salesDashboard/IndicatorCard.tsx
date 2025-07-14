import React from 'react';
import { Card, Box, Typography } from '@mui/material';

interface IndicatorCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function IndicatorCard({ title, value, icon }: IndicatorCardProps) {
  return (
    <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box mb={1}>{icon}</Box>
      <Typography fontWeight={700} fontSize={18}>{value}</Typography>
      <Typography color="text.secondary">{title}</Typography>
    </Card>
  );
} 