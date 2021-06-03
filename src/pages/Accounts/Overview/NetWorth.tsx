import React from 'react';
import { NumberUtils } from '@react-force/number-utils';
import { HorizontalContainer } from '../../../components';
import { NetWorthInfo } from '../../../models';
import './NetWorth.css';

const { formatAsMoney } = NumberUtils;

const LabelValue = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="net-worth__label-value">
      <h1 className="net-worth__label">{label}</h1>
      <p className="net-worth__value">${formatAsMoney(value)}</p>
    </div>
  );
};

export const NetWorth = ({ netWorthInfo }: { netWorthInfo: NetWorthInfo }) => {
  const { cash, investments, netWorth } = netWorthInfo;
  return (
    <HorizontalContainer className="p-2">
      <LabelValue label="Net Worth" value={netWorth} />
      <LabelValue label="Investments" value={investments} />
      <LabelValue label="Cash" value={cash} />
    </HorizontalContainer>
  );
};
