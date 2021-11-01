import React from 'react';
import { Story, Meta } from '@storybook/react';
import { NetWorthRenderer } from './NetWorth';

export default {
  title: 'Pages/Accounts/NetWorth',
  component: NetWorthRenderer,
} as Meta;

const Template: Story = (args) => (
  <div className="paper border-paper">
    <NetWorthRenderer
      investmentTotal={args.investmentTotal}
      cashBalance={args.cashBalance}
    />
  </div>
);

export const NetWorthStory = Template.bind({});
NetWorthStory.storyName = 'NetWorth';
NetWorthStory.args = { investmentTotal: 900000.66, cashBalance: 100000.33 };
