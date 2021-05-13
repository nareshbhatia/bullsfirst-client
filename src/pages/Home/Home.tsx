import React from 'react';
import { Content } from './Content';
import { Footer } from './Footer';
import { Hero } from './Hero';

export const Home = () => {
  return (
    <main>
      <Hero />
      <Content />
      <Footer />
    </main>
  );
};
