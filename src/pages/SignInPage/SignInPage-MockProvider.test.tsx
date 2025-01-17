import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { SignInDocument } from '../../graphql';
import { AuthService } from '../../services';
import { render, screen, userEvent, waitFor } from '../../test/test-utils';
import { SignInPage } from './SignInPage';

const accessToken = '2b9a58c6-d7cc-4a2f-9563-28af8442d28d';

const mocks = [
  {
    request: {
      query: SignInDocument,
      variables: {
        credentials: {
          email: 'johnsmith@gmail.com',
          password: 'let-me-in',
        },
      },
    },
    result: {
      data: {
        signIn: {
          __typename: 'UserInfo',
          user: {
            __typename: 'User',
            id: 'caae8028-8de4-4cb7-9421-4eaca15d941e',
            name: 'Naresh Bhatia',
            email: 'naresh@example.com',
          },
          accessToken,
        },
      },
    },
  },
];

const mockSetAccessToken = jest.spyOn(AuthService, 'setAccessToken');

describe('SignInPage', () => {
  it('saves access token on successful sign in', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignInPage />
      </MockedProvider>
    );

    // Enter valid credentials and submit form
    userEvent.type(screen.getByLabelText('Email'), 'johnsmith@gmail.com');
    userEvent.type(screen.getByLabelText('Password'), 'let-me-in');
    userEvent.click(screen.getByText('Sign in'));

    await waitFor(() =>
      expect(mockSetAccessToken).toHaveBeenCalledWith(accessToken)
    );
  });
});
