import React, { createContext, useContext, useState } from 'react';
import { StatusKey } from '../domain/enums/StatusKey';

interface BatchStatusCounts {
  [StatusKey.PLANEJADO]: number;
  [StatusKey.AGUARDANDO]: number;
  [StatusKey.EM_PRODUCAO]: number;
  [StatusKey.COLHIDO]: number;
}

interface BatchStatusContextValue {
  statusCounts: BatchStatusCounts;
  setStatusCounts: React.Dispatch<React.SetStateAction<BatchStatusCounts>>;
}

const defaultValues: BatchStatusCounts = {
  [StatusKey.PLANEJADO]: 0,
  [StatusKey.AGUARDANDO]: 0,
  [StatusKey.EM_PRODUCAO]: 0,
  [StatusKey.COLHIDO]: 0,
};

const BatchStatusContext = createContext<BatchStatusContextValue | undefined>(undefined);

export const BatchStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [statusCounts, setStatusCounts] = useState<BatchStatusCounts>(defaultValues);

  return (
    <BatchStatusContext.Provider value={{ statusCounts, setStatusCounts }}>
      {children}
    </BatchStatusContext.Provider>
  );
};

export function useBatchStatus() {
  const context = useContext(BatchStatusContext);
  if (!context) throw new Error("useBatchStatus must be used within a BatchStatusProvider");
  return context;
}