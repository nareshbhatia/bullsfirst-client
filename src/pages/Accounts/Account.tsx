import React from 'react';
import { Outlet } from 'react-router-dom';
import { VerticalContainer } from '../../components';
import { AccountHeader } from './AccountHeader';

export const Account = () => {
  return (
    <VerticalContainer className="flex-1">
      <AccountHeader />
      <Outlet />
    </VerticalContainer>
  );
};
