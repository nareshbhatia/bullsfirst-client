import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import Highcharts from 'highcharts';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { ErrorBoundary, Loading } from './components';
import { AuthContextProvider, EnvProvider } from './contexts';
import reportWebVitals from './reportWebVitals';
import { ChartColors, GraphQlUtils } from './utils';

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

// Create Apollo Client
const apolloClient = GraphQlUtils.createApolloClient();

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <EnvProvider>
          <ApolloProvider client={apolloClient}>
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
