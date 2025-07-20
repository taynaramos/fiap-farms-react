import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, CircularProgress, MenuItem, Select, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Product } from '../../domain/entities/Product';
import { SalesRecord } from '../../domain/entities/SalesRecord';
import { GetProductsUseCase } from '../../domain/usecases/product/GetProductsUseCase';
import { GetSalesRecordsUseCase } from '../../domain/usecases/sales/GetSalesRecordsUseCase';
import { ProductRepositoryFirebase } from '../../infra/repositories/ProductRepositoryFirebase';
import { SalesRecordRepositoryFirebase } from '../../infra/repositories/SalesRecordRepositoryFirebase';
import ComparisonCard from '../components/salesDashboard/ComparisonCard';
import IndicatorCard from '../components/salesDashboard/IndicatorCard';
import ProductProfitBarChart from '../components/salesDashboard/ProductProfitBarChart';
import ProductProfitList from '../components/salesDashboard/ProductProfitList';
import withLayoutAndAuth from './withLayoutAndAuth';

const PERIODS = ['Dia', 'Semana', 'Mês', 'Ano'];

function isInPeriod(date: Date, period: string, now: Date) {
  switch (period) {
    case 'Dia':
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
    case 'Semana': {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay() + 1);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return date >= weekStart && date <= weekEnd;
    }
    case 'Mês':
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    case 'Ano':
      return date.getFullYear() === now.getFullYear();
    default:
      return false;
  }
}

function isInPreviousPeriod(date: Date, period: string, now: Date) {
  switch (period) {
    case 'Dia': {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      return date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate();
    }
    case 'Semana': {
      const lastWeekStart = new Date(now);
      lastWeekStart.setDate(now.getDate() - now.getDay() - 5);
      const lastWeekEnd = new Date(lastWeekStart);
      lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
      return date >= lastWeekStart && date <= lastWeekEnd;
    }
    case 'Mês': {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return date.getFullYear() === lastMonth.getFullYear() && date.getMonth() === lastMonth.getMonth();
    }
    case 'Ano':
      return date.getFullYear() === now.getFullYear() - 1;
    default:
      return false;
  }
}

interface ProductProfit {
  productId: string;
  productName: string;
  unitOfMeasure: string;
  profit: number;
  estimatedCostPerUnit: number;
  category?: string;
}

function SalesDashboardPage() {
  const [sales, setSales] = useState<SalesRecord[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('Mês');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const salesRepo = new SalesRecordRepositoryFirebase();
      const salesUsecase = new GetSalesRecordsUseCase(salesRepo);
      const productRepo = new ProductRepositoryFirebase();
      const productUsecase = new GetProductsUseCase(productRepo);
      const [salesList, productsList] = await Promise.all([
        salesUsecase.execute(),
        productUsecase.execute(),
      ]);
      setSales(salesList);
      setProducts(productsList);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
  }

  const productsMap: Record<string, Product> = {};
  products.forEach(p => { productsMap[p.id] = p; });

  const totalSales = sales.reduce((sum, sale) => sum + (sale.totalSaleAmount || 0), 0);
  const totalProfit = sales.reduce((sum, sale) => sum + (sale.calculatedProfit || 0), 0);
  const orders = sales.length;
  const now = new Date();
  const currentPeriodSales = sales.filter(sale => isInPeriod(new Date(sale.saleDate?.toDate?.() || sale.saleDate), selectedPeriod, now)).reduce((sum, sale) => sum + (sale.totalSaleAmount || 0), 0);
  const previousPeriodSales = sales.filter(sale => isInPreviousPeriod(new Date(sale.saleDate?.toDate?.() || sale.saleDate), selectedPeriod, now)).reduce((sum, sale) => sum + (sale.totalSaleAmount || 0), 0);
  const growth = previousPeriodSales > 0 ? (currentPeriodSales - previousPeriodSales) / previousPeriodSales : 0;

  const profitMap: Record<string, { profit: number; totalCost: number; totalSold: number; }> = {};
  sales.forEach(sale => {
    if (!profitMap[sale.productId]) {
      profitMap[sale.productId] = { profit: 0, totalCost: 0, totalSold: 0 };
    }
    profitMap[sale.productId].profit += sale.calculatedProfit || 0;
    profitMap[sale.productId].totalCost += sale.estimatedCostAtSale || 0;
    profitMap[sale.productId].totalSold += sale.quantitySold || 0;
  });
  let productsWithProfit = Object.keys(profitMap).map(productId => {
    const product = productsMap[productId];
    return {
      productId,
      productName: product ? product.name : 'Produto removido',
      unitOfMeasure: product ? product.unitOfMeasure : '',
      category: product ? product.category : '',
      profit: profitMap[productId].profit,
      estimatedCostPerUnit: product ? product.estimatedCostPerUnit : 0,
    };
  });

  productsWithProfit = productsWithProfit.sort((a, b) => {
    if (a.profit > 0 && b.profit > 0) return b.profit - a.profit;
    if (a.profit > 0) return -1;
    if (b.profit > 0) return 1;
    if (a.profit < 0 && b.profit < 0) return a.profit - b.profit;
    if (a.profit < 0) return -1;
    if (b.profit < 0) return 1;
    return 0;
  });

  
  const chartData = productsWithProfit.map((p, i) => ({
    name: p.productName,
    profit: p.profit,
    index: i,
  }));

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={700} mb={2}>Dashboard de Vendas</Typography>
      
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Box flex="1 1 200px" minWidth={200}>
          <IndicatorCard title="Vendas" value={`R$ ${totalSales.toFixed(2)}`} icon={<ShoppingCartIcon color="primary" />} />
        </Box>
        <Box flex="1 1 200px" minWidth={200}>
          <IndicatorCard title="Lucro" value={`R$ ${totalProfit.toFixed(2)}`} icon={<AttachMoneyIcon color="primary" />} />
        </Box>
        <Box flex="1 1 200px" minWidth={200}>
          <IndicatorCard title="Quantidade de Vendas" value={orders.toString()} icon={<ReceiptLongIcon color="primary" />} />
        </Box>
        <Box flex="1 1 200px" minWidth={200}>
          <IndicatorCard title="Crescimento" value={`${(growth * 100).toFixed(1)}%`} icon={<TrendingUpIcon color="primary" />} />
        </Box>
      </Box>
      <Box mb={3}>
        <Typography variant="h6" fontWeight={700}>Produtos e Lucratividade</Typography>
        <Box mt={1} mb={1} sx={{ background: 'rgba(75, 151, 66, 0.1)', borderRadius: 2, p: 2 }}>
          <Box display="flex" alignItems="center" mb={0.5}>
            <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 20, mr: 1 }} />
            <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 500 }}>
              Lucros Positivos <span style={{ fontWeight: 400, color: '#388e3c' }}>(do maior para o menor)</span>
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={0.5}>
            <TrendingDownIcon sx={{ color: '#f44336', fontSize: 20, mr: 1 }} />
            <Typography variant="body2" sx={{ color: '#f44336', fontWeight: 500 }}>
              Prejuízos <span style={{ fontWeight: 400, color: '#d32f2f' }}>(do menor para o maior)</span>
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <RemoveIcon sx={{ color: '#757575', fontSize: 20, mr: 1 }} />
            <Typography variant="body2" sx={{ color: '#757575', fontWeight: 500 }}>
              Sem Vendas <span style={{ fontWeight: 400, color: '#757575' }}>(R$ 0,00)</span>
            </Typography>
          </Box>
        </Box>
        <ProductProfitList productsWithProfit={productsWithProfit} />
      </Box>
      <ProductProfitBarChart chartData={chartData} />
      <Box display="flex" alignItems="center" mb={2} >
        <Typography fontWeight={600} mr={2}>Período:</Typography>
        <Select value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)} size="small">
          {PERIODS.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
        </Select>
      </Box>
      <Box mb={2}>
        <Typography variant="h6" fontWeight={700}>Comparação de Lucro</Typography>
        <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
          <Box flex="1 1 200px" minWidth={200}>
            <ComparisonCard label="Período Anterior" value={previousPeriodSales} />
          </Box>
          <Box flex="1 1 200px" minWidth={200}>
            <ComparisonCard label="Período Atual" value={currentPeriodSales} />
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" fontWeight={700}>Análise Detalhada</Typography>
        <Typography mt={1}>
          {previousPeriodSales > 0
            ? `O lucro ${growth >= 0 ? 'aumentou' : 'diminuiu'} ${(growth * 100).toFixed(1)}% em relação ao período anterior.`
            : 'Não há dados suficientes para comparação.'}
        </Typography>
      </Box>
    </Box>
  );
} 

export default withLayoutAndAuth(SalesDashboardPage)