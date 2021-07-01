import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { LineChart, Loading } from '../../../components';
import { useRefreshContext } from '../../../contexts';
import {
  GetAccountPerformanceDocument,
  SeriesFieldsFragment,
} from '../../../graphql/generated';

// transform series to format required by LineChart
export function computeLineChartSeries(
  accountPerformance: Array<SeriesFieldsFragment>
) {
  return accountPerformance.map((series) => ({
    name: series.name,
    data:
      series.data && series.data.map((dataPoint) => [dataPoint.x, dataPoint.y]),
  }));
}

export const PerformanceChart = () => {
  const { accountId } = useParams();
  const { refreshCount } = useRefreshContext();
  const { loading, error, data, refetch } = useQuery(
    GetAccountPerformanceDocument,
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
  if (!data?.account) {
    throw new Error('Something went wrong');
  }

  const series = computeLineChartSeries(data.account.performance);

  return <LineChart title="PERFORMANCE" series={series} />;
};
