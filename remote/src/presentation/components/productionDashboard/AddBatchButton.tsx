import React from 'react';

interface AddBatchButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function AddBatchButton({ onClick, children }: AddBatchButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '8px 18px',
        fontWeight: 600,
        fontSize: 15,
        cursor: 'pointer',
        boxShadow: '0 2px 8px #0001',
        transition: 'all 0.2s',
      }}
    >
      {children || 'Adicionar Lote'}
    </button>
  );
} 