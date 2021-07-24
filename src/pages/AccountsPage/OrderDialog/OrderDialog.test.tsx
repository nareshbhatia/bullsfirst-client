import React, { useEffect } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import { RefreshContextProvider } from '../../../contexts';
import {
  OrderStatus,
  OrderType,
  PlaceOrderDocument,
  Side,
} from '../../../graphql';
import { render } from '../../../test/test-utils';
import { AccountContextProvider, useAccountContext } from '../AccountContext';
import { OrderContextProvider, useOrderContext } from './OrderContext';
import { OrderDialog } from './OrderDialog';
import { v4 as uuidv4 } from 'uuid';

const mocks = [
  {
    request: {
      query: PlaceOrderDocument,
      variables: {
        orderInput: {
          accountId: 'brokerage-account',
          side: Side.Sell,
          symbol: 'AAPL',
          quantity: 100,
          type: OrderType.Limit,
          limitPrice: 130,
        },
      },
    },
    result: {
      data: {
        order: {
          __typename: 'Order',
          id: uuidv4(),
          side: Side.Sell,
          symbol: 'AAPL',
          quantity: 100,
          type: OrderType.Market,
          limitPrice: null,
          status: OrderStatus.Placed,
          accountId: 'brokerage-account',
          createdAt: '2021-01-01T00:00:00Z',
          createdBy: 'naresh-bhatia',
        },
      },
    },
  },
];

const AccountInitializer = () => {
  const { setAccountState } = useAccountContext();

  useEffect(() => {
    setAccountState({
      account: { id: 'brokerage-account', name: 'Brokerage Account' },
    });
  }, [setAccountState]);

  return null;
};

const AccountHeader = () => {
  const { setOrderState } = useOrderContext();

  const handleOrderClicked = () => {
    setOrderState({ showDialog: true });
  };

  return <button onClick={handleOrderClicked}>Order</button>;
};

describe('OrderDialog', () => {
  it('allows placing an order', async () => {
    const { findByText, getByLabelText, getByTestId, getByText, queryByText } =
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AccountContextProvider>
            <RefreshContextProvider>
              <OrderContextProvider>
                <AccountInitializer />
                <AccountHeader />
                <OrderDialog />
              </OrderContextProvider>
            </RefreshContextProvider>
          </AccountContextProvider>
        </MockedProvider>
      );

    // Open OrderDialog by clicking on the Order button
    userEvent.click(getByText('Order'));
    await findByText('BUY');

    // Check account name under title
    expect(getByText('Brokerage Account')).toBeTruthy();

    // Click on side toggle to change side to sell
    userEvent.click(getByTestId('side-toggle-button'));
    expect(getByText('SELL')).toBeTruthy();

    // Sell 100 shares of AAPL at a limit price of 130
    userEvent.type(getByLabelText('Symbol'), 'AAPL');
    userEvent.type(getByLabelText('Quantity'), '100');
    userEvent.click(getByText('Limit'));
    userEvent.type(getByLabelText('Limit Price'), '130');
    userEvent.click(getByText('Submit'));

    // Expect success dialog to show
    await findByText('SUCCESS');

    // Close the success dialog
    userEvent.click(getByText('Close'));
    expect(queryByText('SUCCESS')).toBeNull();
  });
});
