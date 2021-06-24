import React from 'react';
import { Meta } from '@storybook/react';
import { MemoryRouter as Router } from 'react-router';
import { Hero } from './Hero';

export default {
  title: 'Pages/Home/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const HeroStory = () => (
  <Router>
    <Hero />
  </Router>
);
HeroStory.storyName = 'Hero';
