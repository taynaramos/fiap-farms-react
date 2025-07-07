import { Button } from '@mui/material';
import React from 'react';

interface AddBatchButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function AddBatchButton({ onClick, children }: AddBatchButtonProps) {
  return (
    <Button variant="contained" onClick={onClick}>{children || 'Adicionar Lote'}</Button>
  );
} 