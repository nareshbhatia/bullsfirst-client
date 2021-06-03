import React from 'react';
import { Story, Meta } from '@storybook/react';
import { NetWorth } from './NetWorth';

export default {
  title: 'Pages/Account Overview',
  component: NetWorth,
} as Meta;

const Template: Story = (args) => (
  <div className="paper border-paper">
    <NetWorth netWorthInfo={args.netWorthInfo} />
  </div>
);

export const NetWorthStory = Template.bind({});
NetWorthStory.storyName = 'NetWorth';
NetWorthStory.args = {
  netWorthInfo: {
    netWorth: 14500.12,
    investments: 11000.12,
    cash: 3500.0,
  },
};
