import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Loading, PieChart } from '../../../components';
import { useRefreshContext } from '../../../contexts';
import {
  AssetAllocationFieldsFragment,
  GetAssetAllocationsDocument,
} from '../../../graphql/generated';

export function computePieSeries(
  sectorAllocations: Array<AssetAllocationFieldsFragment>
) {
  return [
    {
      name: 'Sectors',
      data: sectorAllocations
        .map((sectorAllocation) => ({
          name: sectorAllocation.categoryName,
          y: Math.round(sectorAllocation.percentage * 100),
          drilldown: sectorAllocation.categoryId,
        }))
        .sort((a, b) => b.y - a.y), // descending order
    },
  ];
}

export function computePieDrilldown(
  sectorAllocations: Array<AssetAllocationFieldsFragment>
) {
  return {
    activeDataLabelStyle: {
      color: '#000000',
      fontWeight: 'normal',
      textDecoration: 'none',
    },
    series: sectorAllocations.map((sectorAllocation) => {
      const {
        categoryId,
        categoryName,
        children: industryAllocations,
      } = sectorAllocation;

      if (!industryAllocations) {
        return { id: categoryId, name: categoryName, data: [] };
      }

      const data = industryAllocations
        .map((industryAllocation) => {
          return [
            industryAllocation.categoryName,
            Math.round(industryAllocation.percentage * 100),
          ];
        })
        .sort((a: any, b: any) => b[1] - a[1]); // descending order

      return { id: categoryId, name: categoryName, data };
    }),
  };
}

export const AssetAllocationChart = () => {
  const { accountId } = useParams();
  const { refreshCount } = useRefreshContext();
  const { loading, error, data, refetch } = useQuery(
    GetAssetAllocationsDocument,
    {
      variables: {
        accountId,
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [refreshCount, refetch]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error('Something went wrong');
  }

  const { assetAllocations } = data;
  const series = computePieSeries(assetAllocations);
  const drilldown = computePieDrilldown(assetAllocations);

  return (
    <PieChart title="ASSET ALLOCATION" series={series} drilldown={drilldown} />
  );
};
