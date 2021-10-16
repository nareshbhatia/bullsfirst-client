import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { RefreshContextProvider } from '../../../contexts';
import { GetNetWorthDocument } from '../../../graphql';
import { NetWorth } from './NetWorth';

const mocks = [
  {
    request: {
      query: GetNetWorthDocument,
      variables: {
        accountId: 'brokerage-account',
      },
    },
    result: {
      data: {
        account: {
          __typename: 'Account',
          id: 'brokerage-account',
          investmentTotal: 11000.12,
          cashBalance: 3500.0,
        },
      },
    },
  },
];

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
      <MockedProvider mocks={mocks} addTypename={false}>
        <RefreshContextProvider>
          <NetWorth />
        </RefreshContextProvider>
      </MockedProvider>
    );

    await waitForElementToBeRemoved(screen.getByText('Loading...'));

    expect(asFragment()).toMatchSnapshot();
  });
});
