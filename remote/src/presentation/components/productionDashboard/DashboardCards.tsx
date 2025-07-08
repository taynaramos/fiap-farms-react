import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { StatusKey } from '../../../domain/enums/StatusKey';

interface DashboardCardsProps {
  counts: Record<StatusKey, number>;
  statusLabels: { key: StatusKey; label: string; color: string; icon: string }[];
}

export default function DashboardCards({ counts, statusLabels }: DashboardCardsProps) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 4, 
      justifyContent: 'center', 
      mt: 5 
    }}>
      {statusLabels.map(({ key, label, color, icon }) => (
        <Card
          key={key}
          sx={{
            width: 240,
            height: 150,
            bgcolor: '#faf7fa',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          <CardContent sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            p: 2,
          }}>
            <Typography variant="h3" sx={{ mb: 1, fontSize: 32 }}>
              {icon}
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ 
                fontSize: 32, 
                color, 
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              {counts[key]}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: 18, 
                color: '#444',
                textAlign: 'center',
              }}
            >
              {label}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
} 