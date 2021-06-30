import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { RefreshContextProvider } from '../../../contexts';
import { GetNetWorthDocument } from '../../../graphql/generated';
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
        netWorthInfo: {
          __typename: 'NetWorthInfo',
          netWorth: 14500.12,
          investments: 11000.12,
          cash: 3500.0,
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
    const { asFragment, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RefreshContextProvider>
          <NetWorth />
        </RefreshContextProvider>
      </MockedProvider>
    );

    await waitForElementToBeRemoved(getByText('Loading...'));

    expect(asFragment()).toMatchSnapshot();
  });
});
