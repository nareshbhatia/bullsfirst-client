import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { Loading, SideBar } from '../../components';
import { GetAccountsDocument } from '../../graphql';
import { useAccountContext } from './AccountContext';

export const AccountsSideBar = () => {
  const { loading, error, data } = useQuery(GetAccountsDocument);
  const navigate = useNavigate();
  const { accountId } = useParams();
  const { accountState, setAccountState } = useAccountContext();
  const { account: selectedAccount } = accountState;

  // when accounts are loaded, select the first account
  useEffect(() => {
    if (selectedAccount === undefined && data && data.accounts.length > 0) {
      const { id, name } = data.accounts[0];
      setAccountState({
        account: { id, name },
      });
    }
  }, [selectedAccount, setAccountState, data]);

  // when a new account is selected, navigate to its overview tab
  useEffect(() => {
    if (selectedAccount !== undefined && selectedAccount.id !== accountId) {
      navigate(`/accounts/${selectedAccount.id}/overview`);
    }
  }, [accountId, selectedAccount, navigate]);

  const handleNavItemSelected = (navItemId: string) => {
    const accountSelected = data?.accounts?.find(
      (account) => account.id === navItemId
    );
    if (accountSelected) {
      const { id, name } = accountSelected;
      setAccountState({
        account: { id, name },
      });
    }
  };

  if (loading) return <Loading />;
  if (error) {
    throw error;
  }

  if (selectedAccount === undefined) {
    return <div className="p-2">No accounts found</div>;
  }

  return (
    <SideBar
      title="Accounts"
      items={data?.accounts}
      selectedNavItemId={selectedAccount.id}
      onNavItemSelected={handleNavItemSelected}
    />
  );
};
