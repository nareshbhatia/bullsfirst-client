import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Header,
  HorizontalContainer,
  ViewVerticalContainer,
} from '../../components';
import { RefreshContextProvider } from '../../contexts';
import { AccountContextProvider } from './AccountContext';
import { AccountsSideBar } from './AccountsSideBar';
import { TransferContextProvider, TransferDialog } from './TransferDialog';

export const AccountsPage = () => {
  return (
    <AccountContextProvider>
      <RefreshContextProvider>
        <TransferContextProvider>
          <ViewVerticalContainer>
            <Header />
            <HorizontalContainer className="min-h-0">
              <AccountsSideBar />
              <Outlet />
            </HorizontalContainer>
          </ViewVerticalContainer>
          <TransferDialog />
        </TransferContextProvider>
      </RefreshContextProvider>
    </AccountContextProvider>
  );
};
