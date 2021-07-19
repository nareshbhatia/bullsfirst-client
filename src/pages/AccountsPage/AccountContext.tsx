import React, { useContext, useState } from 'react';

// ---------- AccountContext ----------
type AccountInfo = {
  id: string;
  name: string;
};

type AccountState = {
  account?: AccountInfo;
};

type AccountStateSetter = (accountState: AccountState) => void;

/** AccountContext contains AccountState and AccountStateSetter */
const AccountContext = React.createContext<
  | { accountState: AccountState; setAccountState: AccountStateSetter }
  | undefined
>(undefined);

// ---------- AccountContextProvider ----------
const AccountContextProvider: React.FC = ({ children }) => {
  const [accountState, setAccountState] = useState<AccountState>({});

  const value = { accountState, setAccountState };
  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

// ---------- useAccountContext ----------
function useAccountContext() {
  const accountContext = useContext(AccountContext);
  /* istanbul ignore next */
  if (accountContext === undefined) {
    throw new Error(
      'useAccountContext must be used within a AccountContextProvider'
    );
  }
  return accountContext;
}

export { AccountContextProvider, useAccountContext };
