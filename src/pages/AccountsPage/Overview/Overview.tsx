import React from 'react';
import { HorizontalContainer } from '../../../components';
import { AssetAllocationChart } from './AssetAllocationChart';
import { NetWorth } from './NetWorth';
import { PerformanceChart } from './PerformanceChart';
import './Overview.css';

export const Overview = () => {
  return (
    <div className="p-2">
      <div className="paper border-paper">
        <NetWorth />
      </div>
      <HorizontalContainer className="justify-between mt-2">
        <div className="account-overview__chart paper border-paper">
          <AssetAllocationChart />
        </div>
        <div className="account-overview__chart paper border-paper">
          <PerformanceChart />
        </div>
      </HorizontalContainer>
    </div>
  );
};
