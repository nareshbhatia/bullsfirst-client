import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { addDecorator } from '@storybook/react';
import Highcharts from 'highcharts';
import { AuthContextProvider, EnvProvider } from '../src/contexts';
import { AuthService } from '../src/services';
import '../src/styles/main.css';
import { ChartColors } from '../src/utils';

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

const StoryDecorator = (Story: any) => (
  <EnvProvider>
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <Story />
      </AuthContextProvider>
    </ApolloProvider>
  </EnvProvider>
);

addDecorator(StoryDecorator);
