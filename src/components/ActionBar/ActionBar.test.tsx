import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionBar } from './ActionBar';

describe('<ActionBar />', () => {
  test('performs actions on button click', () => {
    const handleClose = jest.fn();
    const handleViewTransactions = jest.fn();

    const closeButton = {
      label: 'Close',
      className: 'btn-sm btn-outline-secondary',
      onClick: handleClose,
    };

    const viewTransactionsButton = {
      label: 'View Transactions',
      className: 'btn-sm btn-primary ml-1',
      onClick: handleViewTransactions,
    };

    const { getByText } = render(
      <ActionBar buttonSpecs={[closeButton, viewTransactionsButton]} />
    );

    userEvent.click(getByText('Close'));
    expect(handleClose).toBeCalledTimes(1);
    expect(handleViewTransactions).toBeCalledTimes(0);

    userEvent.click(getByText('View Transactions'));
    expect(handleClose).toBeCalledTimes(1);
    expect(handleViewTransactions).toBeCalledTimes(1);
  });
});
