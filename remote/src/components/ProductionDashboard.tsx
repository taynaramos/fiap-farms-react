import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { StatusKey } from '../enums/StatusKey';

const STATUS_LABELS: { key: StatusKey; label: string; color: string; icon: string }[] = [
  { key: StatusKey.PLANEJADO, label: 'Planejado', color: '#2196f3', icon: '📋🕒' },
  { key: StatusKey.AGUARDANDO, label: 'Aguardando', color: '#ff9800', icon: '🟡💬' },
  { key: StatusKey.EM_PRODUCAO, label: 'Em Produção', color: '#4caf50', icon: '🌱🚜' },
  { key: StatusKey.COLHIDO, label: 'Colhido', color: '#9c27b0', icon: '🟢✔️' },
];

export default function ProductionDashboard() {
  const [counts, setCounts] = useState<Record<StatusKey, number>>({
    [StatusKey.PLANEJADO]: 0,
    [StatusKey.AGUARDANDO]: 0,
    [StatusKey.EM_PRODUCAO]: 0,
    [StatusKey.COLHIDO]: 0,
  });

  useEffect(() => {
    async function fetchCounts() {
      const snapshot = await getDocs(collection(db, 'productionBatches'));
      const statusCounts: Record<StatusKey, number> = {
        [StatusKey.PLANEJADO]: 0,
        [StatusKey.AGUARDANDO]: 0,
        [StatusKey.EM_PRODUCAO]: 0,
        [StatusKey.COLHIDO]: 0,
      };
      snapshot.forEach(doc => {
        const status = doc.data().status as StatusKey;
        if (statusCounts[status] !== undefined) {
          statusCounts[status]++;
        }
      });
      setCounts(statusCounts);
    }
    fetchCounts();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', marginTop: 40 }}>
      {STATUS_LABELS.map(({ key, label, color, icon }) => (
        <div key={key} style={{
          background: '#faf7fa',
          borderRadius: 16,
          boxShadow: '0 4px 12px #0001',
          width: 240,
          height: 150,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
          <div style={{ fontSize: 32, color, fontWeight: 700 }}>{counts[key]}</div>
          <div style={{ fontSize: 18, color: '#444', marginTop: 4 }}>{label}</div>
        </div>
      ))}
    </div>
  );
} 