import React from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useMessageContext } from '../../../components';
import { useRefreshContext } from '../../../contexts';
import {
  OrderInput,
  OrderType,
  PlaceOrderDocument,
  Side,
} from '../../../graphql';
import { useAccountContext } from '../AccountContext';
import { OrderDefaults, useOrderContext } from './OrderContext';
import { Order, OrderForm } from './OrderForm';

export const OrderDialog = () => {
  const { accountState } = useAccountContext();
  const { account } = accountState;
  const { orderState, setOrderState } = useOrderContext();
  const { showDialog, orderDefaults } = orderState;
  const { setMessageState } = useMessageContext();
  const [placeOrder] = useMutation(PlaceOrderDocument);
  const { refreshCount, setRefreshCount } = useRefreshContext();
  const navigate = useNavigate();

  const closeButton = {
    label: 'Close',
    className: 'btn-sm btn-outline-secondary',
    onClick: () => {
      setMessageState({ showDialog: false });
    },
  };

  const viewOrdersButton = {
    label: 'View Orders',
    className: 'btn-sm btn-primary ml-1',
    onClick: () => {
      setMessageState({ showDialog: false });
      navigate(`/accounts/${account?.id}/orders`);
    },
  };

  if (account === undefined) {
    return null;
  }

  const defaultValues: OrderDefaults = orderDefaults
    ? orderDefaults
    : {
        accountId: account.id,
        side: Side.Buy,
        type: OrderType.Market,
      };

  const handleSubmit = async (order: Order) => {
    try {
      const { security, ...rest } = order;
      const orderInput: OrderInput = {
        symbol: security.id,
        ...rest,
      };
      await placeOrder({ variables: { orderInput } });
      setOrderState({ showDialog: false });
      setMessageState({
        showDialog: true,
        title: 'SUCCESS',
        message: 'Your order has been placed.',
        buttonSpecs: [closeButton, viewOrdersButton],
      });

      // Refresh the page to get latest data
      setRefreshCount(refreshCount + 1);
    } catch (e) {
      setOrderState({ showDialog: false });
      setMessageState({
        showDialog: true,
        title: 'ERROR',
        message: e instanceof Error ? e.message : "Unknown error",
        buttonSpecs: [closeButton],
      });
    }
  };

  return (
    <Popup
      open={showDialog}
      closeOnDocumentClick={false}
      closeOnEscape={false}
      modal
      nested
    >
      <OrderForm orderDefaults={defaultValues} onSubmit={handleSubmit} />
    </Popup>
  );
};
