import React, { createContext, useContext, useState } from 'react';

export const RemoveModeratorContext = createContext<RemoveModeratorContextType>(null as any);

export type RemoveModeratorStateType = {
  showForm: boolean
};

export type RemoveModeratorContextType = {
  state: RemoveModeratorStateType,
  setShowForm: (showForm: boolean) => void
  resetState: () => void
};
const initialState = {
  showForm: true,
};

export function RemoveModeratorProvider(props: any) {
  const [state, setState] = useState<RemoveModeratorStateType>(initialState);

  const resetState = () => {
    setState(initialState);
  };

  const setShowForm = (showForm: boolean) => {
    setState({
      ...state,
      showForm,
    });
  };

  const value: RemoveModeratorContextType = {
    state,
    setShowForm,
    resetState,
  };

  const { children } = props;
  return (
    <RemoveModeratorContext.Provider value={value}>
      {children}
    </RemoveModeratorContext.Provider>
  );
}

export function useRemoveModeratorContext(): RemoveModeratorContextType {
  return useContext(RemoveModeratorContext);
}
