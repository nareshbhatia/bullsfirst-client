import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { LineChart, Loading } from '../../../components';
import { useRefreshContext } from '../../../contexts';
import { Series } from '../../../models';

interface AccountPerformanceData {
  accountPerformance: Array<Series>;
}

export const GET_ACCOUNT_PERFORMANCE = gql`
  query GetAccountPerformance($accountId: ID!) {
    accountPerformance(id: $accountId) {
      name
      data {
        x
        y
      }
    }
  }
`;

// transform series to format required by LineChart
export function computeLineChartSeries(accountPerformance: Array<Series>) {
  return accountPerformance.map((series) => ({
    name: series.name,
    data: series.data.map((dataPoint) => [dataPoint.x, dataPoint.y]),
  }));
}

export const PerformanceChart = () => {
  const { accountId } = useParams();
  const { refreshCount } = useRefreshContext();
  const { loading, data, refetch } = useQuery<AccountPerformanceData>(
    GET_ACCOUNT_PERFORMANCE,
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

  const { accountPerformance } = data;
  const series = computeLineChartSeries(accountPerformance);

  return <LineChart title="PERFORMANCE" series={series} />;
};
