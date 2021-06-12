import React from 'react';
import { Story, Meta } from '@storybook/react';
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

export default {
  title: 'Components/Charts',
  component: PieChart,
} as Meta;

const Template: Story = (args) => (
  <div className="paper border-paper" style={{ height: 388 }}>
    <PieChart
      title={args.title}
      series={args.series}
      drilldown={args.drilldown}
    />
  </div>
);

export const PieChartStory = Template.bind({});
PieChartStory.storyName = 'PieChart';
PieChartStory.args = {
  title: 'TOP SPENDING CATEGORIES',
  series,
  drilldown,
};
