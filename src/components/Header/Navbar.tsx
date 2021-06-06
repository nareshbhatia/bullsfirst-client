import React, { Fragment } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../../contexts';
import { AuthService } from '../../services';
import './Navbar.css';

const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      accessToken
    }
  }
`;

export const Navbar = () => {
  const { authState, setAuthState } = useAuthState();
  const { user } = authState;
  const navigate = useNavigate();
  const [signOut] = useMutation(SIGN_OUT);
  const apolloClient = useApolloClient();

  /* istanbul ignore next */
  const handleSignOut = async () => {
    await signOut();

    // clear the apollo cache to remove the user and any other query results
    await apolloClient.clearStore();
    AuthService.removeAccessToken();

    // navigate before setting authState to avoid saving incorrect signInRedirect
    navigate('/');
    setAuthState({ ...authState, user: undefined });
  };

  return (
    <nav className="navbar">
      <span className="navbar__brand">Bullsfirst</span>

      {user !== undefined ? (
        <Fragment>
          <div className="navbar__username">{user.name}</div>
          <FaSignOutAlt
            className="navbar__signout"
            aria-labelledby="Sign out"
            onClick={handleSignOut}
          />
        </Fragment>
      ) : null}
    </nav>
  );
};
