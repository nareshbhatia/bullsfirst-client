import React from 'react';
import { Meta } from '@storybook/react';
import { MemoryRouter as Router, Route, Routes } from 'react-router';
import { RefreshContextProvider } from '../../../contexts';
import { NetWorth } from './NetWorth';

export default {
  title: 'Pages/Accounts/NetWorth',
  component: NetWorth,
} as Meta;

export const NetWorthStory = () => (
  <Router initialEntries={['/accounts/brokerage-account/overview']}>
    <Routes>
      <Route
        path="/accounts/:accountId/overview"
        element={
          <RefreshContextProvider>
            <div className="paper border-paper">
              <NetWorth />
            </div>
          </RefreshContextProvider>
        }
      />
    </Routes>
  </Router>
);
NetWorthStory.storyName = 'NetWorth';
