import React, { useContext, useState } from 'react';
import { OrderType, Side } from '../../../graphql';

// ---------- OrderContext ----------
// everything that OrderDialog allows to enter is kept as optional
export type OrderDefaults = {
  accountId: string;
  side?: Side;
  symbol?: string;
  quantity?: number;
  type?: OrderType;
  limitPrice?: number;
};

type OrderState = {
  showDialog: boolean;
  orderDefaults?: OrderDefaults;
};
type OrderStateSetter = (orderState: OrderState) => void;

/** OrderContext contains OrderState and OrderStateSetter */
const OrderContext = React.createContext<
  { orderState: OrderState; setOrderState: OrderStateSetter } | undefined
>(undefined);

// ---------- OrderContextProvider ----------
const OrderContextProvider: React.FC = ({ children }) => {
  const [orderState, setOrderState] = useState<OrderState>({
    showDialog: false,
  });

  const value = { orderState, setOrderState };
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

// ---------- useOrderContext ----------
function useOrderContext() {
  const orderContext = useContext(OrderContext);
  /* istanbul ignore next */
  if (orderContext === undefined) {
    throw new Error(
      'useOrderContext must be used within a OrderContextProvider'
    );
  }
  return orderContext;
}

export { OrderContextProvider, useOrderContext };
