import React from 'react';
import { Button, Box } from '@mui/material';

interface StatusFiltersProps {
  statusFilters: { key: string; label: string }[];
  statusFilter: string;
  setStatusFilter: (key: string) => void;
}

export default function StatusFilters({ statusFilters, statusFilter, setStatusFilter }: StatusFiltersProps) {
  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 1.5, 
      my: 4, 
      justifyContent: 'center', 
      flexWrap: 'wrap' 
    }}>
      {statusFilters.map(({ key, label }) => (
        <Button
          key={key}
          variant={statusFilter === key ? 'contained' : 'outlined'}
          onClick={() => setStatusFilter(key)}
          sx={{
            px: 2.25,
            py: 1,
            borderRadius: 1,
            fontWeight: 500,
            fontSize: 15,
            textTransform: 'none',
            borderWidth: statusFilter === key ? 2 : 1,
            borderColor: statusFilter === key ? 'primary.main' : 'grey.300',
            bgcolor: statusFilter === key ? 'primary.50' : 'background.paper',
            color: statusFilter === key ? 'primary.700' : 'text.primary',
            boxShadow: statusFilter === key ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: statusFilter === key ? 'primary.100' : 'grey.50',
              borderColor: statusFilter === key ? 'primary.main' : 'grey.400',
              transform: 'translateY(-1px)',
              boxShadow: statusFilter === key ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
} 