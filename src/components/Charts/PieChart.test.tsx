import React from 'react';
import { render } from '@testing-library/react';
import { PieChart } from './PieChart';

const series = [
  {
    name: 'Categories',
    data: [
      { name: 'Taxes', y: 30, drilldown: 'Taxes' },
      { name: 'Food & Dining', y: 25, drilldown: 'Food & Dining' },
      { name: 'Health', y: 25, drilldown: 'Health' },
      { name: 'Travel & Shopping', y: 20, drilldown: 'Travel & Shopping' },
    ],
  },
];

const drilldown = {
  activeDataLabelStyle: {
    color: '#000000',
    fontWeight: 'normal',
    textDecoration: 'none',
  },
  series: [
    {
      name: 'Taxes',
      id: 'Taxes',
      data: [
        ['Federal', 60],
        ['State', 30],
        ['Property', 10],
      ],
    },
    {
      name: 'Food & Dining',
      id: 'Food & Dining',
      data: [
        ['Groceries', 50],
        ['Restaurants', 40],
        ['Fast Food', 10],
      ],
    },
    {
      name: 'Health',
      id: 'Health',
      data: [
        ['Health Insurance', 40],
        ['Dental', 30],
        ['Medications', 30],
      ],
    },
    {
      name: 'Travel & Shopping',
      id: 'Travel & Shopping',
      data: [
        ['Travel', 40],
        ['Room', 40],
        ['Food', 20],
      ],
    },
  ],
};

describe('PieChart', () => {
  test('PieChart renders correctly', () => {
    const { container } = render(
      <PieChart
        title="TOP SPENDING CATEGORIES"
        series={series}
        drilldown={drilldown}
      />
    );
    const pies = container.querySelectorAll('.highcharts-point');
    expect(pies).toHaveLength(4);
  });
});
