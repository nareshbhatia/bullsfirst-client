import React from 'react';
import { Outlet } from 'react-router-dom';
import { VerticalContainer } from '../../components';
import { AccountHeader } from './AccountHeader';

export const AccountView = () => {
  return (
    <VerticalContainer className="flex-1">
      <AccountHeader />
      <Outlet />
    </VerticalContainer>
  );
};
