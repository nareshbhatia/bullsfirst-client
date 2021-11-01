import React from 'react';
import { render, screen, userEvent } from '../../test/test-utils';
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

    render(<ActionBar buttonSpecs={[closeButton, viewTransactionsButton]} />);

    userEvent.click(screen.getByText('Close'));
    expect(handleClose).toBeCalledTimes(1);
    expect(handleViewTransactions).toBeCalledTimes(0);

    userEvent.click(screen.getByText('View Transactions'));
    expect(handleClose).toBeCalledTimes(1);
    expect(handleViewTransactions).toBeCalledTimes(1);
  });
});
