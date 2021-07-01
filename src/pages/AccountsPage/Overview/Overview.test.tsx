import React from 'react';
import { RefreshContextProvider } from '../../../contexts';
import { render } from '../../../test/test-utils';
import { Overview } from './Overview';

// mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    accountId: 'brokerage-account',
  }),
}));

describe('<Overview />', () => {
  test('renders correctly', async () => {
    const { findByText } = render(
      <RefreshContextProvider>
        <Overview />
      </RefreshContextProvider>
    );

    expect(await findByText('Net Worth')).toBeTruthy();
    expect(await findByText('ASSET ALLOCATION')).toBeTruthy();
    expect(await findByText('PERFORMANCE')).toBeTruthy();
  });
});
