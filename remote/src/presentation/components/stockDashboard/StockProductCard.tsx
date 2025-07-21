import { Card, CardContent, Box, Typography, Avatar } from "@mui/material";
import { Inventory } from '../../../domain/entities/Inventory';

export default function StockProductCard({ item, index }: { item: Inventory, index: number }) {
    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 3, maxWidth: 500, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32, fontSize: 14, fontWeight: 'bold' }}>
                    {index + 1}
                </Avatar>
                <Box>
                    <Typography variant="subtitle1" fontWeight={600}>{item.productName}</Typography>
                    <Typography variant="body2" color="success.main">Disponível: {item.availableQuantity} {item.unitOfMeasure}</Typography>
                    <Typography variant="body2" color="success.main">Vendido: {item.soldQuantity} {item.unitOfMeasure}</Typography>
                </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="success.main" fontWeight={600}>R$ {item.estimatedCostPerUnit.toFixed(2)}</Typography>
                <Typography variant="caption" color="text.secondary">por {item.unitOfMeasure}</Typography>
                <Typography variant="body2" color="success.main" fontWeight={500} mt={1}>Última atualização: {item.lastUpdated ? new Date(item.lastUpdated.seconds ? item.lastUpdated.seconds * 1000 : item.lastUpdated).toLocaleDateString() : ''}</Typography>
            </Box>
        </Card>
    );
}
