import React from 'react';
import { Meta } from '@storybook/react';
import { MemoryRouter as Router, Route, Routes } from 'react-router';
import { NetWorth } from './NetWorth';

export default {
  title: 'Pages/Account Overview',
  component: NetWorth,
} as Meta;

export const NetWorthStory = () => (
  <Router initialEntries={['/accounts/brokerage-account/overview']}>
    <Routes>
      <Route
        path="/accounts/:accountId/overview"
        element={
          <div className="paper border-paper">
            <NetWorth />
          </div>
        }
      />
    </Routes>
  </Router>
);
NetWorthStory.storyName = 'NetWorth';
