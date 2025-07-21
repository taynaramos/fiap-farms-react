import { Card, CardContent, Box, Typography, Avatar } from "@mui/material";
import { SalesRecord } from '../../../domain/entities/SalesRecord';

export default function SalesRegisterCard({ sale, index }: { sale: SalesRecord, index: number }) {
    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 3, maxWidth: 500, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32, fontSize: 14, fontWeight: 'bold' }}>
                    <Typography variant="subtitle1" fontWeight={600}>R$</Typography>
                </Avatar>
                <Box>
                    <Typography variant="subtitle1" fontWeight={600}>{sale.productName}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Typography variant="body2" color="success.main">{sale.quantitySold} {sale.unitOfMeasure}</Typography>
                        <Typography variant="body2" color="text.secondary">{sale.saleDate ? new Date(sale.saleDate.seconds ? sale.saleDate.seconds * 1000 : sale.saleDate).toLocaleDateString() : ''}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="success.main" fontWeight={600}>R$ {sale.salePricePerUnit.toFixed(2)} / {sale.unitOfMeasure}</Typography>
                <Typography variant="body2" color="success.main" fontWeight={500} mt={1}>Lucro: R$ {sale.calculatedProfit.toFixed(2)}</Typography>
            </Box>
        </Card>
    );
}
