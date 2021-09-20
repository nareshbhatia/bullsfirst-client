import React, { ReactElement, Suspense } from 'react';
import { ApolloProvider } from '@apollo/client';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import {
  ErrorBoundary,
  Loading,
  MessageContextProvider,
  MessageDialog,
} from '../components';
import { AuthContextProvider, EnvProvider } from '../contexts';
import { GraphQlUtils } from '../utils';

// -----------------------------------------------------------------------------
// This file re-exports everything from React Testing Library and then overrides
// its render method. In tests that require global context providers, import
// this file instead of React Testing Library.
//
// For further details, see:
// https://testing-library.com/docs/react-testing-library/setup/#custom-render
// -----------------------------------------------------------------------------

// Create Apollo Client
const apolloClient = GraphQlUtils.createApolloClient();

const AllProviders: React.FC = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      <MessageContextProvider>
        <ErrorBoundary>
          <EnvProvider>
            <ApolloProvider client={apolloClient}>
              <AuthContextProvider>
                <Router>{children}</Router>
                <MessageDialog />
              </AuthContextProvider>
            </ApolloProvider>
          </EnvProvider>
        </ErrorBoundary>
      </MessageContextProvider>
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
