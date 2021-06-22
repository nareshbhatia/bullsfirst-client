import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Loading, PieChart } from '../../../components';
import { useRefreshContext } from '../../../contexts';
import { AssetAllocation } from '../../../models';

interface AssetAllocationData {
  assetAllocations: Array<AssetAllocation>;
}

export const GET_ASSET_ALLOCATIONS = gql`
  query GetAssetAllocations($accountId: ID!) {
    assetAllocations(accountId: $accountId) {
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

export function computePieSeries(sectorAllocations: Array<AssetAllocation>) {
  return [
    {
      name: 'Sectors',
      data: sectorAllocations
        .map((sectorAllocation) => ({
          name: sectorAllocation.name,
          y: Math.round(sectorAllocation.percentage * 100),
          drilldown: sectorAllocation.id,
        }))
        .sort((a, b) => b.y - a.y), // descending order
    },
  ];
}

export function computePieDrilldown(sectorAllocations: Array<AssetAllocation>) {
  return {
    activeDataLabelStyle: {
      color: '#000000',
      fontWeight: 'normal',
      textDecoration: 'none',
    },
    series: sectorAllocations.map((sectorAllocation) => {
      const { id, name, children: industryAllocations } = sectorAllocation;

      if (!industryAllocations) {
        return { id, name, data: [] };
      }

      const data = industryAllocations
        .map((industryAllocation) => {
          return [
            industryAllocation.name,
            Math.round(industryAllocation.percentage * 100),
          ];
        })
        .sort((a: any, b: any) => b[1] - a[1]); // descending order

      return { id, name, data };
    }),
  };
}

export const AssetAllocationChart = () => {
  const { accountId } = useParams();
  const { refreshCount } = useRefreshContext();
  const { loading, data, refetch } = useQuery<AssetAllocationData>(
    GET_ASSET_ALLOCATIONS,
    {
      variables: {
        accountId,
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [refreshCount, refetch]);

  if (loading || !data) {
    return <Loading />;
  }

  const { assetAllocations } = data;
  const series = computePieSeries(assetAllocations);
  const drilldown = computePieDrilldown(assetAllocations);

  return (
    <PieChart title="ASSET ALLOCATION" series={series} drilldown={drilldown} />
  );
};
