import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Loading, PieChart } from '../../../components';
import { AssetAllocation } from '../../../models';

interface AssetAllocationData {
  assetAllocations: Array<AssetAllocation>;
}

export const GET_ASSET_ALLOCATIONS = gql`
  query GetAssetAllocations($accountId: ID!) {
    assetAllocations(id: $accountId) {
      id
      name
      value
      percentage
      children {
        id
        name
        value
        percentage
      }
    }
  }
`;

export const AssetAllocationChart = () => {
  const { accountId } = useParams();
  const { loading, data } = useQuery<AssetAllocationData>(
    GET_ASSET_ALLOCATIONS,
    {
      variables: {
        accountId,
      },
    }
  );

  if (loading || !data) {
    return <Loading />;
  }

  const { assetAllocations } = data;

  // configure top-level chart (sector allocations)
  const series = [
    {
      name: 'Sectors',
      data: assetAllocations
        .map((sectorAllocation) => ({
          name: sectorAllocation.name,
          y: sectorAllocation.percentage * 100,
          drilldown: sectorAllocation.id,
        }))
        .sort((a, b) => b.y - a.y), // descending order
    },
  ];

  // configure drilldown charts (industry allocations)
  const drilldown = {
    activeDataLabelStyle: {
      color: '#000000',
      fontWeight: 'normal',
      textDecoration: 'none',
    },
    series: assetAllocations.map((sectorAllocation) => {
      const { id, name, children: industryAllocations } = sectorAllocation;

      if (!industryAllocations) {
        return { id, name, data: [] };
      }

      const data = industryAllocations
        .map((industryAllocation) => {
          return [industryAllocation.name, industryAllocation.percentage * 100];
        })
        .sort((a: any, b: any) => b[1] - a[1]); // descending order

      return { id, name, data };
    }),
  };

  return (
    <PieChart title="ASSET ALLOCATION" series={series} drilldown={drilldown} />
  );
};
