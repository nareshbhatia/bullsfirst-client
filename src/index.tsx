import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Highcharts from 'highcharts';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { ErrorBoundary, Loading } from './components';
import { AuthContextProvider, EnvProvider } from './contexts';
import { WindowEnv } from './models';
import reportWebVitals from './reportWebVitals';
import { AuthService } from './services';
import { ChartColors, EnvVar } from './utils';
import './index.scss';
import './styles/main.css';

// Start mock service worker
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
  worker.printHandlers();
}

// Initialize Highcharts
Highcharts.setOptions({
  colors: ChartColors,
});

// Create Apollo client
const env = new WindowEnv();
const httpLink = createHttpLink({
  uri: env.get(EnvVar.API_URL),
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
  defaultOptions: {
    watchQuery: {
      // Executes queries against both the cache and the GraphQL server.
      // The query automatically updates if the result of the server-side
      // query modifies the cached fields.
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <EnvProvider>
          <ApolloProvider client={client}>
            <AuthContextProvider>
              <Router>
                <App />
              </Router>
            </AuthContextProvider>
          </ApolloProvider>
        </EnvProvider>
      </ErrorBoundary>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
