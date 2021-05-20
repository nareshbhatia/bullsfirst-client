import React, { ReactElement, Suspense } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { ErrorBoundary, Loading } from '../components';
import { AuthContextProvider, EnvProvider } from '../contexts';
import { AuthService } from '../services';

// -----------------------------------------------------------------------------
// This file re-exports everything from React Testing Library and then overrides
// its render method. In tests that require global context providers, import
// this file instead of React Testing Library.
//
// For further details, see:
// https://testing-library.com/docs/react-testing-library/setup/#custom-render
// -----------------------------------------------------------------------------

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

const AllProviders: React.FC = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <EnvProvider>
          <ApolloProvider client={client}>
            <AuthContextProvider>
              <Router>{children}</Router>
            </AuthContextProvider>
          </ApolloProvider>
        </EnvProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

/**
 * Custom render method that includes global context providers
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
