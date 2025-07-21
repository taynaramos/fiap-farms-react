import { configureStore } from '@reduxjs/toolkit';
import batchReducer from "./slices/batchSlice";

export const store = configureStore({
  reducer: {
    batches: batchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;