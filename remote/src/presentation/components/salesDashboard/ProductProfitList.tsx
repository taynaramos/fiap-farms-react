import React from 'react';
import { Box, Avatar, Typography, Chip, Card } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';

interface ProductProfit {
  productId: string;
  productName: string;
  unitOfMeasure: string;
  profit: number;
  estimatedCostPerUnit: number;
  category?: string;
}

interface ProductProfitListProps {
  productsWithProfit: ProductProfit[];
}

export default function ProductProfitList({ productsWithProfit }: ProductProfitListProps) {
  if (productsWithProfit.length === 0) {
    return (
      <Card sx={{ p: 3, mt: 2 }}>
        <Typography align="center" color="text.secondary">Nenhum produto vendido ainda.</Typography>
      </Card>
    );
  }
  return (
    <Box>
      {productsWithProfit.map((product) => {
        let statusIcon = <RemoveIcon />;
        let statusColor = 'gray';
        let statusText = 'SEM VENDAS';
        if (product.profit > 0) {
          statusIcon = <TrendingUpIcon />;
          statusColor = 'green';
          statusText = 'LUCRO';
        } else if (product.profit < 0) {
          statusIcon = <TrendingDownIcon />;
          statusColor = 'red';
          statusText = 'PREJUÍZO';
        }
        return (
          <Box key={product.productId} display="flex" alignItems="center" mb={1}>
            <Avatar sx={{ bgcolor: statusColor, width: 32, height: 32, mr: 2 }}>{statusIcon}</Avatar>
            <Box flex={1}>
              <Typography fontWeight={600}>{product.productName} <Chip label={statusText} size="small" sx={{ ml: 1, bgcolor: statusColor, color: '#fff' }} /></Typography>
              <Typography variant="body2" color="text.secondary">{product.category} - {product.unitOfMeasure}</Typography>
            </Box>
            <Box textAlign="right">
              <Typography fontWeight={700} color={statusColor}>R$ {product.profit.toFixed(2)}</Typography>
              <Typography variant="caption" color="text.secondary">Custo: R$ {product.estimatedCostPerUnit.toFixed(2)}</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
} 