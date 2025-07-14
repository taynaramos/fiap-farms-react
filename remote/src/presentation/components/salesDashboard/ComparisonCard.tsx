import React from 'react';
import { Card, Typography } from '@mui/material';

interface ComparisonCardProps {
  label: string;
  value: number;
}

export default function ComparisonCard({ label, value }: ComparisonCardProps) {
  return (
    <Card sx={{ p: 2, textAlign: 'center' }}>
      <Typography fontWeight={600}>{label}</Typography>
      <Typography fontSize={18} fontWeight={700} mt={1}>R$ {value.toFixed(2)}</Typography>
    </Card>
  );
} 