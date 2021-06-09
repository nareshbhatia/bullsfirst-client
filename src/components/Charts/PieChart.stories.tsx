import React from 'react';
import { Story, Meta } from '@storybook/react';
import { PieChart } from './PieChart';
import { DataPoint } from '../../models';

const monthlySpending: Array<DataPoint> = [
  { name: 'Taxes', y: 30 },
  { name: 'Food & Dining', y: 25 },
  { name: 'Health Insurance', y: 25 },
  { name: 'Travel & Shopping', y: 20 },
];

export default {
  title: 'Components/Charts',
  component: PieChart,
} as Meta;

const Template: Story = (args) => (
  <div className="paper border-paper" style={{ height: 388 }}>
    <PieChart title={args.title} data={args.data} />
  </div>
);

export const PieChartStory = Template.bind({});
PieChartStory.storyName = 'PieChart';
PieChartStory.args = {
  title: 'TOP SPENDING CATEGORIES',
  data: monthlySpending,
};
