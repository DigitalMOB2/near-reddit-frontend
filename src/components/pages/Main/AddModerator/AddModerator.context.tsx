import React, { createContext, useContext, useState } from 'react';

export const AddModeratorContext = createContext<AddModeratorContextType>(null as any);

export type AddModeratorStateType = {
  showForm: boolean
};

export type AddModeratorContextType = {
  state: AddModeratorStateType,
  setShowForm: (showForm: boolean) => void
  resetState: () => void
};
const initialState = {
  showForm: true,
};

export function AddModeratorProvider(props: any) {
  const [state, setState] = useState<AddModeratorStateType>(initialState);

  const resetState = () => {
    setState(initialState);
  };

  const setShowForm = (showForm: boolean) => {
    setState({
      ...state,
      showForm,
    });
  };

  const value: AddModeratorContextType = {
    state,
    setShowForm,
    resetState,
  };

  const { children } = props;
  return (
    <AddModeratorContext.Provider value={value}>
      {children}
    </AddModeratorContext.Provider>
  );
}

export function useAddModeratorContext(): AddModeratorContextType {
  return useContext(AddModeratorContext);
}
