import React, { useContext, useState } from 'react';

// ---------- TransferContext ----------
type TransferState = {
  showDialog: boolean;
};
type TransferStateSetter = (transferState: TransferState) => void;

/** TransferContext contains TransferState and TransferStateSetter */
const TransferContext = React.createContext<
  | { transferState: TransferState; setTransferState: TransferStateSetter }
  | undefined
>(undefined);

// ---------- TransferContextProvider ----------
const TransferContextProvider: React.FC = ({ children }) => {
  const [transferState, setTransferState] = useState<TransferState>({
    showDialog: false,
  });

  const value = { transferState, setTransferState };
  return (
    <TransferContext.Provider value={value}>
      {children}
    </TransferContext.Provider>
  );
};

// ---------- useTransferContext ----------
function useTransferContext() {
  const transferContext = useContext(TransferContext);
  /* istanbul ignore next */
  if (transferContext === undefined) {
    throw new Error(
      'useTransferContext must be used within a TransferContextProvider'
    );
  }
  return transferContext;
}

export { TransferContextProvider, useTransferContext };
