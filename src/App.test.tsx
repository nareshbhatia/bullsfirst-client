import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { App, GET_USER } from './App';
import { AuthContextProvider } from './contexts';
import { HomePage, NotFoundPage } from './pages';

jest.mock('./pages/HomePage/HomePage');
jest.mock('./pages/NotFoundPage/NotFoundPage');

const mocks = [
  {
    request: {
      query: GET_USER,
    },
  },
];

describe('<App />', () => {
  test('renders the Home page on default route', () => {
    // Arrange
    (HomePage as jest.Mock).mockImplementation(() => <div>HomePageMock</div>);

    // Act
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthContextProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </AuthContextProvider>
      </MockedProvider>
    );

    // Assert
    expect(getByText('HomePageMock')).toBeTruthy();
  });

  test('renders the Not Found page for an invalid route', () => {
    // Arrange
    (NotFoundPage as jest.Mock).mockImplementation(() => (
      <div>NotFoundMock</div>
    ));

    // Act
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthContextProvider>
          <MemoryRouter initialEntries={['/invalid/route']}>
            <App />
          </MemoryRouter>
        </AuthContextProvider>
      </MockedProvider>
    );

    // Assert
    expect(getByText('NotFoundMock')).toBeTruthy();
  });
});
