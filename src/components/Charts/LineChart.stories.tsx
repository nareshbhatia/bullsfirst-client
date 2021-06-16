import React from 'react';
import { Story, Meta } from '@storybook/react';
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

export default {
  title: 'Components/Charts',
  component: LineChart,
} as Meta;

const Template: Story = (args) => (
  <div className="paper border-paper" style={{ height: 388 }}>
    <LineChart title={args.title} series={args.series} />
  </div>
);

export const LineChartStory = Template.bind({});
LineChartStory.storyName = 'LineChart';
LineChartStory.args = {
  title: 'PERFORMANCE',
  series,
};
