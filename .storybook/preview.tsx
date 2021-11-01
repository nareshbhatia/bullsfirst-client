import React, { Suspense } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router } from 'react-router-dom';
import Highcharts from 'highcharts';
import {
  ErrorBoundary,
  Loading,
  MessageContextProvider,
  MessageDialog,
} from '../src/components';
import { AuthContextProvider, EnvProvider } from '../src/contexts';
import { AuthService } from '../src/services';
import { ChartColors } from '../src/utils';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'reactjs-popup/dist/index.css';
import '../src/styles/main.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Style Guide', 'Components', 'Pages'],
    },
  },
};

// Start mock service worker
const { worker } = require('../src/mocks/browser');
worker.start();
worker.printHandlers();

// Initialize Highcharts
Highcharts.setOptions({
  colors: ChartColors,
});

// Create Apollo client
const httpLink = createHttpLink({
  uri: 'https://localhost:8080',
});
const authLink = setContext((_, { headers }) => {
  const token = AuthService.getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const decorators = [
  (Story: any) => (
    <Suspense fallback={<Loading />}>
      <MessageContextProvider>
        <ErrorBoundary>
          <EnvProvider>
            <ApolloProvider client={client}>
              <AuthContextProvider>
                <Router>
                  <Story />
                </Router>
                <MessageDialog />
              </AuthContextProvider>
            </ApolloProvider>
          </EnvProvider>
        </ErrorBoundary>
      </MessageContextProvider>
    </Suspense>
  ),
];
