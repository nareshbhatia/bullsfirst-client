import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { NumberUtils } from '@react-force/number-utils';
import { useParams } from 'react-router-dom';
import { HorizontalContainer, Loading } from '../../../components';
import { useRefreshContext } from '../../../contexts';
import { GetNetWorthDocument } from '../../../graphql/generated';
import './NetWorth.css';

const { formatAsMoney } = NumberUtils;

const LabelValue = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="net-worth__label-value">
      <h1 className="title2">{label}</h1>
      <p className="net-worth__value">${formatAsMoney(value)}</p>
    </div>
  );
};

export const NetWorth = () => {
  const { accountId } = useParams();
  const { refreshCount } = useRefreshContext();
  const { loading, error, data, refetch } = useQuery(GetNetWorthDocument, {
    variables: {
      accountId,
    },
  });

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

  const { cash, investments, netWorth } = data.netWorthInfo;
  return (
    <HorizontalContainer className="p-2">
      <LabelValue label="Net Worth" value={netWorth} />
      <LabelValue label="Investments" value={investments} />
      <LabelValue label="Cash" value={cash} />
    </HorizontalContainer>
  );
};
