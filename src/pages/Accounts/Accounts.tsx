import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Header,
  HorizontalContainer,
  Loading,
  SideBar,
  ViewVerticalContainer,
} from '../../components';

const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      name
    }
  }
`;

export const Accounts = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);
  const [selectedNavId, setSelectedNavId] = useState<string | undefined>();
  const navigate = useNavigate();

  // when accounts are loaded, select the first account
  useEffect(() => {
    if (selectedNavId === undefined && data && data.accounts.length > 0) {
      setSelectedNavId(data.accounts[0].id);
    }
  }, [selectedNavId, data]);

  // when a new account is selected, navigate to its overview tab
  useEffect(() => {
    if (selectedNavId !== undefined) {
      navigate(`/accounts/${selectedNavId}/overview`);
    }
  }, [selectedNavId, navigate]);

  const handleNavItemSelected = (navItemId: string) => {
    setSelectedNavId(navItemId);
  };

  if (loading) return <Loading />;
  if (error) {
    throw error;
  }

  return (
    <ViewVerticalContainer>
      <Header />
      <HorizontalContainer className="min-h-0">
        {selectedNavId !== undefined ? (
          <SideBar
            title="Accounts"
            items={data?.accounts}
            selectedNavItemId={selectedNavId}
            onNavItemSelected={handleNavItemSelected}
          />
        ) : (
          <div className="p-2">No accounts found</div>
        )}
        <Outlet />
      </HorizontalContainer>
    </ViewVerticalContainer>
  );
};
