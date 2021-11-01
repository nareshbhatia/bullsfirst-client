import React from 'react';
import { render } from '../../test/test-utils';
import { LineChart } from './LineChart';

const series = [
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

describe('LineChart', () => {
  test('LineChart renders correctly', () => {
    const { container } = render(
      <LineChart title="PERFORMANCE" series={series} />
    );
    const lines = container.querySelectorAll(
      '.highcharts-series-group .highcharts-series'
    );
    expect(lines).toHaveLength(2);
  });
});
