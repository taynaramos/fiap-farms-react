import React from 'react';
import { StatusKey } from '../../../domain/enums/StatusKey';

interface DashboardCardsProps {
  counts: Record<StatusKey, number>;
  statusLabels: { key: StatusKey; label: string; color: string; icon: string }[];
}

export default function DashboardCards({ counts, statusLabels }: DashboardCardsProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', marginTop: 40 }}>
      {statusLabels.map(({ key, label, color, icon }) => (
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