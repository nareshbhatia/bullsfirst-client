import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { NumberUtils } from '@react-force/number-utils';
import { useParams } from 'react-router-dom';
import { HorizontalContainer, Loading } from '../../../components';
import { useRefreshContext } from '../../../contexts';
import { GetNetWorthDocument } from '../../../graphql';
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

export const NetWorthRenderer = (props: {
  investmentTotal: number;
  cashBalance: number;
}) => {
  const { investmentTotal, cashBalance } = props;
  return (
    <HorizontalContainer className="p-2">
      <LabelValue label="Net Worth" value={investmentTotal + cashBalance} />
      <LabelValue label="Investments" value={investmentTotal} />
      <LabelValue label="Cash" value={cashBalance} />
    </HorizontalContainer>
  );
};

export const NetWorth = () => {
  const { accountId } = useParams();
  const { refreshCount } = useRefreshContext();
  const { loading, error, data, refetch } = useQuery(GetNetWorthDocument, {
    variables: {
      accountId: accountId as string,
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
  if (!data?.account) {
    throw new Error('Something went wrong');
  }

  const { investmentTotal, cashBalance } = data.account;
  return (
    <NetWorthRenderer
      investmentTotal={investmentTotal}
      cashBalance={cashBalance}
    />
  );
};
