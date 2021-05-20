import React, { Fragment } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthState, useAuthStateSetter } from '../../contexts';
import { AuthService } from '../../services';
import './Navbar.css';
import { gql, useMutation } from '@apollo/client';

const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      accessToken
    }
  }
`;

export const Navbar = () => {
  const authState = useAuthState();
  const setAuthState = useAuthStateSetter();
  const navigate = useNavigate();
  const { user } = authState;
  const [signOut] = useMutation(SIGN_OUT);

  /* istanbul ignore next */
  const handleSignOut = async () => {
    await signOut();
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
