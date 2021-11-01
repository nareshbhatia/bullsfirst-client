import React, { useEffect } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { RefreshContextProvider } from '../../../contexts';
import { TransferCashDocument } from '../../../graphql';
import { render, userEvent } from '../../../test/test-utils';
import { AccountContextProvider, useAccountContext } from '../AccountContext';
import { TransferContextProvider, useTransferContext } from './TransferContext';
import { TransferDialog } from './TransferDialog';

const mocks = [
  {
    request: {
      query: TransferCashDocument,
      variables: {
        transferCashInput: {
          amount: 1000,
          accountId: 'brokerage-account',
          direction: 'OUT',
        },
      },
    },
    result: {
      data: {
        transferCash: {
          __typename: 'CashTransfer',
          id: 'transaction-001',
          type: 'CASH_TRANSFER',
          accountId: 'brokerage-account',
          createdAt: '2021-01-01T00:00:00Z',
          createdBy: 'naresh-bhatia',
          direction: 'OUT',
          amount: -1000,
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
  const { setTransferState } = useTransferContext();

  const handleTransferClicked = () => {
    setTransferState({ showDialog: true });
  };

  return <button onClick={handleTransferClicked}>Transfer</button>;
};

describe('TransferDialog', () => {
  it('allows initiating a transfer', async () => {
    const { findByText, getByLabelText, getByTestId, getByText, queryByText } =
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <AccountContextProvider>
            <RefreshContextProvider>
              <TransferContextProvider>
                <AccountInitializer />
                <AccountHeader />
                <TransferDialog />
              </TransferContextProvider>
            </RefreshContextProvider>
          </AccountContextProvider>
        </MockedProvider>
      );

    // Open TransferDialog by clicking on the Transfer button
    userEvent.click(getByText('Transfer'));
    await findByText('TRANSFER IN');

    // Check account name under title
    expect(getByText('Brokerage Account')).toBeTruthy();

    // Click on direction toggle to change direction
    userEvent.click(getByTestId('direction-toggle-button'));
    expect(getByText('TRANSFER OUT')).toBeTruthy();

    // Transfer $1000 out of this account
    userEvent.type(getByLabelText('Amount'), '1000');
    userEvent.click(getByText('Submit'));

    // Expect success dialog to show
    await findByText('SUCCESS');

    // Close the success dialog
    userEvent.click(getByText('Close'));
    expect(queryByText('SUCCESS')).toBeNull();
  });
});
