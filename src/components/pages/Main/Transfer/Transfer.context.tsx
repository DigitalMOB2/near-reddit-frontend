import React, { createContext, useContext, useState } from 'react';

export const TransferContext = createContext<TransferContextType>(null as any);

export type TransferStateType = {
  showForm: boolean
};

export type TransferContextType = {
  state: TransferStateType,
  setShowForm: (showForm: boolean) => void
  resetState: () => void
};
const initialState = {
  showForm: true,
};

export function TransferProvider(props: any) {
  const [state, setState] = useState<TransferStateType>(initialState);

  const resetState = () => {
    setState(initialState);
  };

  const setShowForm = (showForm: boolean) => {
    setState({
      ...state,
      showForm,
    });
  };

  const value: TransferContextType = {
    state,
    setShowForm,
    resetState,
  };

  const { children } = props;
  return (
    <TransferContext.Provider value={value}>
      {children}
    </TransferContext.Provider>
  );
}

export function useTransferContext(): TransferContextType {
  return useContext(TransferContext);
}
