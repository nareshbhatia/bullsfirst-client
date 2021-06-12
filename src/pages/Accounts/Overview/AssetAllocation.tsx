import React from 'react';
import { PieChart } from '../../../components';

const series = [
  {
    name: 'Sectors',
    data: [
      { name: 'Technology', y: 30, drilldown: 'Technology' },
      { name: 'Energy', y: 25, drilldown: 'Energy' },
      { name: 'Utilities', y: 20, drilldown: 'Utilities' },
      { name: 'Healthcare', y: 15, drilldown: 'Healthcare' },
      { name: 'Financial Services', y: 10, drilldown: 'Financial Services' },
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
      name: 'Technology',
      id: 'Technology',
      data: [
        ['Federal', 60],
        ['State', 30],
        ['Property', 10],
      ],
    },
    {
      name: 'Energy',
      id: 'Energy',
      data: [
        ['Groceries', 50],
        ['Restaurants', 40],
        ['Fast Food', 10],
      ],
    },
    {
      name: 'Utilities',
      id: 'Utilities',
      data: [
        ['Health Insurance', 40],
        ['Dental', 30],
        ['Medications', 30],
      ],
    },
    {
      name: 'Healthcare',
      id: 'Healthcare',
      data: [
        ['Travel', 40],
        ['Room', 40],
        ['Food', 20],
      ],
    },
    {
      name: 'Financial Services',
      id: 'Financial Services',
      data: [
        ['Travel', 40],
        ['Room', 40],
        ['Food', 20],
      ],
    },
  ],
};

export const AssetAllocation = () => {
  return (
    <PieChart title="ASSET ALLOCATION" series={series} drilldown={drilldown} />
  );
};
