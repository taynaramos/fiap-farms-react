import React, { useEffect, useState } from 'react';
import { StatusKey } from '../../domain/enums/StatusKey';
import { GetProductsUseCase } from '../../domain/usecases/product/GetProductsUseCase';
import { ProductRepositoryFirebase } from '../../infra/repositories/ProductRepositoryFirebase';
import { Product } from '../../domain/entities/Product';
import { STATUS_LABELS } from '../const/statusLabels';
import { getTodayISO, getFutureISO, parseDateToBrasilia } from '../const/dateUtils';
import { CreateProductionBatchUseCase } from '../../domain/usecases/production/CreateProductionBatchUseCase';
import { ProductionBatchRepositoryFirebase } from '../../infra/repositories/ProductionBatchRepositoryFirebase';

export default function CreateProductionBatchPage() {
  const [product, setProduct] = useState('');
  const [startDate, setStartDate] = useState(getTodayISO());
  const [estimatedEndDate, setEstimatedEndDate] = useState(getFutureISO(3));
  const [estimatedQuantity, setEstimatedQuantity] = useState('');
  const [status, setStatus] = useState(StatusKey.PLANEJADO);
  const [notes, setNotes] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const repo = new ProductRepositoryFirebase();
    const useCase = new GetProductsUseCase(repo);
    useCase.execute().then(setProducts).finally(() => setLoadingProducts(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    const selectedProduct = products.find(p => p.id === product);
    if (!selectedProduct) return;
    const repo = new ProductionBatchRepositoryFirebase();
    const useCase = new CreateProductionBatchUseCase(repo);

    await useCase.execute({
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      startDate: parseDateToBrasilia(startDate),
      estimatedEndDate: parseDateToBrasilia(estimatedEndDate),
      status,
      estimatedQuantity: Number(estimatedQuantity),
      notes
    });
    alert('Lote criado com sucesso!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '32px auto', background: '#faf7fa', borderRadius: 16, boxShadow: '0 4px 12px #0001', padding: 24 }}>
      <h2 style={{ textAlign: 'center', color: '#4caf50', marginBottom: 24 }}>Novo Lote de Produção</h2>
      {/* Produto */}
      <label style={{ fontWeight: 500, marginBottom: 4, display: 'block' }}>Produto *</label>
      <select value={product} onChange={e => setProduct(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginBottom: 16 }} disabled={loadingProducts}>
        <option value="">Selecione um produto</option>
        {products.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
      </select>
      {/* Data de início */}
      <label style={{ fontWeight: 500, marginBottom: 4, display: 'block' }}>Data de Início *</label>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginBottom: 16 }} />
      {/* Data estimada de colheita */}
      <label style={{ fontWeight: 500, marginBottom: 4, display: 'block' }}>Data Estimada de Colheita *</label>
      <input type="date" value={estimatedEndDate} onChange={e => setEstimatedEndDate(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginBottom: 16 }} />
      {/* Quantidade estimada */}
      <label style={{ fontWeight: 500, marginBottom: 4, display: 'block' }}>Quantidade Estimada *</label>
      <input type="number" min="0" step="0.01" value={estimatedQuantity} onChange={e => setEstimatedQuantity(e.target.value)} required placeholder="0,0" style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginBottom: 16 }} />
      {/* Status inicial */}
      <label style={{ fontWeight: 500, marginBottom: 4, display: 'block' }}>Status Inicial</label>
      <select value={status} onChange={e => setStatus(e.target.value as StatusKey)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginBottom: 16 }}>
        {STATUS_LABELS.map(opt => <option key={opt.key} value={opt.key}>{opt.icon} {opt.label}</option>)}
      </select>
      {/* Observações */}
      <label style={{ fontWeight: 500, marginBottom: 4, display: 'block' }}>Observações</label>
      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Informações adicionais sobre o lote..." style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', marginBottom: 24, minHeight: 60 }} />
      <button type="submit" style={{ width: '100%', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginTop: 8 }}>
        Criar Lote de Produção
      </button>
    </form>
  );
} 