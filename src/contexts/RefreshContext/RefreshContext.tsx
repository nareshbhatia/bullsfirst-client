import React, { useContext, useState } from 'react';

// ---------- RefreshContext ----------
type RefreshCountSetter = (refreshCount: number) => void;

/** RefreshContext contains refreshCount and RefreshCountSetter */
const RefreshContext = React.createContext<
  { refreshCount: number; setRefreshCount: RefreshCountSetter } | undefined
>(undefined);

// ---------- RefreshContextProvider ----------
const RefreshContextProvider: React.FC = ({ children }) => {
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const value = { refreshCount, setRefreshCount };
  return (
    <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>
  );
};

// ---------- useRefreshContext ----------
function useRefreshContext() {
  const refreshContext = useContext(RefreshContext);
  /* istanbul ignore next */
  if (refreshContext === undefined) {
    throw new Error(
      'useRefreshContext must be used within a RefreshContextProvider'
    );
  }
  return refreshContext;
}

export { RefreshContextProvider, useRefreshContext };
