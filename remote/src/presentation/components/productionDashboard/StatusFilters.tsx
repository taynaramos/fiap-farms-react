import React from 'react';

interface StatusFiltersProps {
  statusFilters: { key: string; label: string }[];
  statusFilter: string;
  setStatusFilter: (key: string) => void;
}

export default function StatusFilters({ statusFilters, statusFilter, setStatusFilter }: StatusFiltersProps) {
  return (
    <div style={{ display: 'flex', gap: 12, margin: '32px 0 16px 0', justifyContent: 'center', flexWrap: 'wrap' }}>
      {statusFilters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setStatusFilter(key)}
          style={{
            padding: '8px 18px',
            borderRadius: 8,
            border: statusFilter === key ? '2px solid var(--primary-500)' : '1px solid #ccc',
            background: statusFilter === key ? 'var(--primary-50)' : '#fff',
            color: statusFilter === key ? 'var(--primary-700)' : '#333',
            fontWeight: 500,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: statusFilter === key ? '0 2px 8px #0001' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
} 