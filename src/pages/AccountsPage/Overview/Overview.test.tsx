import React from 'react';
import { RefreshContextProvider } from '../../../contexts';
import { render, screen } from '../../../test/test-utils';
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
    render(
      <RefreshContextProvider>
        <Overview />
      </RefreshContextProvider>
    );

    expect(await screen.findByText('Net Worth')).toBeTruthy();
    expect(await screen.findByText('ASSET ALLOCATION')).toBeTruthy();
    expect(await screen.findByText('PERFORMANCE')).toBeTruthy();
  });
});
