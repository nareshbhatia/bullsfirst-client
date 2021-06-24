import React from 'react';
import { RefreshContextProvider } from '../../../contexts';
import { render, waitForElementToBeRemoved } from '../../../test/test-utils';
import { computeLineChartSeries, PerformanceChart } from './PerformanceChart';

const accountPerformance = [
  {
    name: 'Brokerage Account',
    data: [
      { x: 2015, y: 0 },
      { x: 2016, y: -4.7 },
      { x: 2017, y: 24.5 },
      { x: 2018, y: 45.1 },
      { x: 2019, y: 40.9 },
      { x: 2020, y: 75.5 },
      { x: 2021, y: 80.7 },
    ],
  },
  {
    name: 'S&P 500',
    data: [
      { x: 2015, y: 0 },
      { x: 2016, y: -10.2 },
      { x: 2017, y: 14.0 },
      { x: 2018, y: 34.9 },
      { x: 2019, y: 30.1 },
      { x: 2020, y: 63.5 },
      { x: 2021, y: 68.2 },
    ],
  },
];

const expectedLineChartSeries = [
  {
    name: 'Brokerage Account',
    data: [
      [2015, 0],
      [2016, -4.7],
      [2017, 24.5],
      [2018, 45.1],
      [2019, 40.9],
      [2020, 75.5],
      [2021, 80.7],
    ],
  },
  {
    name: 'S&P 500',
    data: [
      [2015, 0],
      [2016, -10.2],
      [2017, 14.0],
      [2018, 34.9],
      [2019, 30.1],
      [2020, 63.5],
      [2021, 68.2],
    ],
  },
];

// mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    accountId: 'brokerage-account',
  }),
}));

describe('<PerformanceChart />', () => {
  test('computeLineChartSeries() computes the series correctly', () => {
    const actualSeries = computeLineChartSeries(accountPerformance);
    expect(actualSeries).toEqual(expectedLineChartSeries);
  });

  test('renders correctly', async () => {
    const { container, getByText } = render(
      <RefreshContextProvider>
        <PerformanceChart />
      </RefreshContextProvider>
    );

    await waitForElementToBeRemoved(getByText('Loading...'));

    const lines = container.querySelectorAll(
      '.highcharts-series-group .highcharts-series'
    );
    expect(lines).toHaveLength(2);
  });
});
