import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { GET_NET_WORTH, NetWorth } from './NetWorth';

const mocks = [
  {
    request: {
      query: GET_NET_WORTH,
      variables: {
        accountId: 'brokerage-account',
      },
    },
    result: {
      data: {
        netWorthInfo: {
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
        <NetWorth />
      </MockedProvider>
    );

    await waitForElementToBeRemoved(getByText('Loading...'));

    expect(asFragment()).toMatchSnapshot();
  });
});
