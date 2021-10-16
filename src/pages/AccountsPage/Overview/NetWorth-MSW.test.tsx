import React from 'react';
import { RefreshContextProvider } from '../../../contexts';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '../../../test/test-utils';
import { NetWorth } from './NetWorth';

// mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    accountId: 'brokerage-account',
  }),
}));

describe('<NetWorth />', () => {
  test('renders correctly', async () => {
    const { asFragment } = render(
      <RefreshContextProvider>
        <NetWorth />
      </RefreshContextProvider>
    );

    await waitForElementToBeRemoved(screen.getByText('Loading...'));

    expect(asFragment()).toMatchSnapshot();
  });
});
