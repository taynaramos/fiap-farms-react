import { Card, CardContent, Box, Typography, Avatar } from "@mui/material";

export default function SalesRegisterCard({ item, index }: {
    item: {
        productName: string;
        estimatedQuantity: number;
        actualQuantity: number;
        estimatedCostPerUnit: number;
    }, index: number
}) {
    const disponivel = item.estimatedQuantity - (item.actualQuantity || 0);
    const vendido = item.actualQuantity || 0;
    const precoPorKg = item.estimatedCostPerUnit;
    const totalVendido = vendido * precoPorKg;

    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 3, maxWidth: 500, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32, fontSize: 14, fontWeight: 'bold' }}>
                    <Typography variant="subtitle1" fontWeight={600}>R$</Typography>
                </Avatar>
                <Box>
                    <Typography variant="subtitle1" fontWeight={600}>{item.productName}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Typography variant="body2" color="success.main">{disponivel.toFixed(1)} kg</Typography>
                        {/* <Typography variant="body2" color="success.main">createdAt</Typography> */}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="success.main" fontWeight={600}>R$ {precoPorKg.toFixed(2)}</Typography>
                <Typography variant="body2" color="success.main" fontWeight={500} mt={1}>Lucro: R$ {totalVendido.toFixed(2)}</Typography>
            </Box>
        </Card>
    );
}
