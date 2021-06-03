import React from 'react';
import { NetWorthInfo } from '../../../models';
import { NetWorth } from './NetWorth';

export const NetWorthContainer = () => {
  const netWorthInfo: NetWorthInfo = {
    netWorth: 14500.12,
    investments: 11000.12,
    cash: 3500.0,
  };
  return <NetWorth netWorthInfo={netWorthInfo} />;
};
