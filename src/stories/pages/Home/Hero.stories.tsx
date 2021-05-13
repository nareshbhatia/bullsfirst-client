import React from 'react';
import { Meta } from '@storybook/react';
import { Hero } from '../../../pages/Home/Hero';

export default {
  title: 'Pages/Home/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const HeroStory = () => <Hero />;
HeroStory.storyName = 'Hero';
