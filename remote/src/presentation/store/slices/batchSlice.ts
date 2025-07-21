import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductionBatch } from '../../../domain/entities/ProductionBatch';
import { StatusKey } from '../../../domain/enums/StatusKey';

interface BatchState {
  planejado: ProductionBatch[];
  aguardando: ProductionBatch[];
  emProducao: ProductionBatch[];
  colhido: ProductionBatch[];
}

const initialState: BatchState = {
  planejado: [],
  aguardando: [],
  emProducao: [],
  colhido: [],
};

export const batchSlice = createSlice({
  name: 'batches',
  initialState,
  reducers: {
    setBatches(state, action: PayloadAction<ProductionBatch[]>) {
      state.planejado = action.payload.filter(b => b.status === StatusKey.PLANEJADO);
      state.aguardando = action.payload.filter(b => b.status === StatusKey.AGUARDANDO);
      state.emProducao = action.payload.filter(b => b.status === StatusKey.EM_PRODUCAO);
      state.colhido = action.payload.filter(b => b.status === StatusKey.COLHIDO);
    },
  },
});

export const { setBatches } = batchSlice.actions;
export default batchSlice.reducer;
