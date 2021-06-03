import React from 'react';
import { HorizontalContainer } from '../../../components';
import { AssetAllocation } from './AssetAllocation';
import { NetWorthContainer } from './NetWorthContainer';
import { Performance } from './Performance';
import './Overview.css';

export const Overview = () => {
  return (
    <div className="p-2">
      <div className="paper border-paper">
        <NetWorthContainer />
      </div>
      <HorizontalContainer className="justify-between mt-2">
        <div className="account-overview__chart paper border-paper">
          <AssetAllocation />
        </div>
        <div className="account-overview__chart paper border-paper">
          <Performance />
        </div>
      </HorizontalContainer>
    </div>
  );
};
