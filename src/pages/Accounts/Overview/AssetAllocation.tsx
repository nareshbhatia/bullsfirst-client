import React from 'react';
import { PieChart } from '../../../components';
import { DataPoint } from '../../../models';

const assetAllocation: Array<DataPoint> = [
  { name: 'Technology', y: 30 },
  { name: 'Financial Services', y: 10 },
  { name: 'Utilities', y: 20 },
  { name: 'Healthcare', y: 15 },
  { name: 'Energy', y: 25 },
];

export const AssetAllocation = () => {
  return <PieChart title="ASSET ALLOCATION" data={assetAllocation} />;
};
