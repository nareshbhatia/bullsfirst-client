import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { NumberUtils } from '@react-force/number-utils';
import { useParams } from 'react-router-dom';
import { HorizontalContainer, Loading } from '../../../components';
import { NetWorthInfo } from '../../../models';
import './NetWorth.css';

const { formatAsMoney } = NumberUtils;

interface NetWorthData {
  netWorthInfo: NetWorthInfo;
}

export const GET_NET_WORTH = gql`
  query GetNetWorth($accountId: ID!) {
    netWorthInfo(id: $accountId) {
      netWorth
      investments
      cash
    }
  }
`;

const LabelValue = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="net-worth__label-value">
      <h1 className="net-worth__label">{label}</h1>
      <p className="net-worth__value">${formatAsMoney(value)}</p>
    </div>
  );
};

export const NetWorth = () => {
  const { accountId } = useParams();
  const { loading, data } = useQuery<NetWorthData>(GET_NET_WORTH, {
    variables: {
      accountId,
    },
  });

  if (loading || !data) {
    return <Loading />;
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
