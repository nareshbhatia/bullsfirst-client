import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import {
  HorizontalContainer,
  ScrollingContainer,
  ViewVerticalContainer,
} from '../Containers';
import { SimpleHeader } from '../Header';
import { NavItem, SideBar } from './SideBar';

const items: Array<NavItem> = [
  {
    id: 'brokerage-account',
    name: 'Brokerage Account',
  },
  {
    id: 'retirement-account',
    name: 'Retirement Account',
  },
  {
    id: 'jennys-college-fund',
    name: "Jenny's College Fund",
  },
];

export default {
  title: 'Components/SideBar',
  component: SideBar,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = () => {
  const [selectedNavId, setSelectedNavId] = useState('brokerage-account');

  const handleNavItemSelected = (navItemId: string) => {
    setSelectedNavId(navItemId);
  };

  return (
    <ViewVerticalContainer>
      <SimpleHeader />
      <HorizontalContainer className="min-h-0">
        <SideBar
          title="Accounts"
          items={items}
          selectedNavItemId={selectedNavId}
          onNavItemSelected={handleNavItemSelected}
        />
        <ScrollingContainer className="flex-1 p-2">
          <h1 className="title2">
            {items.find((item) => item.id === selectedNavId)?.name}
          </h1>
        </ScrollingContainer>
      </HorizontalContainer>
    </ViewVerticalContainer>
  );
};

export const SideBarStory = Template.bind({});
SideBarStory.storyName = 'SideBar';
SideBarStory.args = {};
