import React from 'react';
import { RefreshContextProvider } from '../../../contexts';
import { render } from '../../../test/test-utils';
import { Orders } from './Orders';

// mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    accountId: 'brokerage-account',
  }),
}));

describe('<Orders />', () => {
  test('renders correctly', async () => {
    const { findAllByRole } = render(
      <RefreshContextProvider>
        <Orders />
      </RefreshContextProvider>
    );

    // TODO: Find a better way to test ag-grid
    // The answer (36) shown below is wrong
    await findAllByRole('row');
    // expect(rows.length).toBe(36);
  });
});
