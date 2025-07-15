import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, Cell } from 'recharts';
import { Typography, Box } from '@mui/material';

interface ChartDataItem {
  name: string;
  profit: number;
  index: number;
}

interface ProductProfitBarChartProps {
  chartData: ChartDataItem[];
}

function getBarColor(profit: number) {
  if (profit > 0) return '#4caf50';
  if (profit < 0) return '#f44336';
  return '#bdbdbd';
}

export default function ProductProfitBarChart({ chartData }: ProductProfitBarChartProps) {
  if (!chartData || chartData.length === 0) return null;
  return (
    <Box mb={3}>
      <Typography variant="h6" fontWeight={700} mb={1}>Lucro por Produto (Gráfico)</Typography>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} margin={{ left: 10, right: 10 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={60} />
          <YAxis tickFormatter={v => `R$${(v/1000).toFixed(1)}k`} />
          <Tooltip
            formatter={(value: number, name: string) => [
                `R$ ${Number(value).toFixed(2)}`,
                name === 'profit' ? 'Lucro' : name
            ]}
          />
          <Bar dataKey="profit" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={getBarColor(entry.profit)} />
            ))}
            <LabelList dataKey="profit" position="top" formatter={v => `R$${Number(v).toFixed(0)}`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
} 