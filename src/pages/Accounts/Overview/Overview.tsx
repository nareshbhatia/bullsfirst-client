import React from 'react';
import { HorizontalContainer } from '../../../components';
import { AssetAllocation } from './AssetAllocation';
import { NetWorth } from './NetWorth';
import { Performance } from './Performance';
import './Overview.css';

export const Overview = () => {
  return (
    <div className="p-2">
      <div className="paper border-paper">
        <NetWorth />
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
