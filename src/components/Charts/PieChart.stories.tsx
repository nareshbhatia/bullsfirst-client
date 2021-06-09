import React from 'react';
import { Story, Meta } from '@storybook/react';
import { PieChart } from './PieChart';
import { DataPoint } from '../../models';

const monthlySpending: Array<DataPoint> = [
  { name: 'Food & Dining', y: 22 },
  { name: 'Health Insurance', y: 18 },
  { name: 'Miscellaneous', y: 32 },
  { name: 'Travel & Shopping', y: 16 },
];

export default {
  title: 'Components/Charts',
  component: PieChart,
} as Meta;

const Template: Story = (args) => (
  <div className="paper border-paper" style={{ width: 380, height: 380 }}>
    <PieChart title={args.title} data={args.data} />
  </div>
);

export const PieChartStory = Template.bind({});
PieChartStory.storyName = 'PieChart';
PieChartStory.args = {
  title: 'TOP SPENDING CATEGORIES',
  data: monthlySpending,
};
