import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Header,
  HorizontalContainer,
  Loading,
  SideBar,
  ViewVerticalContainer,
} from '../../components';
import { RefreshContextProvider } from '../../contexts';
import { GetAccountsDocument } from '../../graphql';

export const AccountsPage = () => {
  const { loading, error, data } = useQuery(GetAccountsDocument);
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
    <RefreshContextProvider>
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
    </RefreshContextProvider>
  );
};
