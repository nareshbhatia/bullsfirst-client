import React from 'react';
import { render, waitForElementToBeRemoved } from '../../../test/test-utils';
import { AssetAllocationChart } from './AssetAllocationChart';

// mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    accountId: 'brokerage-account',
  }),
}));

describe('<AssetAllocationChart />', () => {
  test('renders correctly', async () => {
    const { container, getByText } = render(<AssetAllocationChart />);

    await waitForElementToBeRemoved(getByText('Loading...'));

    const pies = container.querySelectorAll('.highcharts-point');
    expect(pies).toHaveLength(3);
  });
});
