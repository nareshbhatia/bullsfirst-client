import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { NumberUtils } from '@react-force/number-utils';
import {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
} from 'ag-grid-community';
import { useParams } from 'react-router-dom';
import {
  CustomGrid,
  GridToolbar,
  HorizontalContainer,
  Loading,
  VerticalContainer,
} from '../../../components';
import { GridContextProvider, useRefreshContext } from '../../../contexts';
import {
  CashTransfer,
  Direction,
  GetTransactionsDocument,
  Side,
  Trade,
  Transaction,
  TransactionType,
  TransactionTypeLookup,
} from '../../../graphql';

export const Activity = () => {
  const { accountId } = useParams();
  const { refreshCount } = useRefreshContext();
  const { loading, error, data, refetch } = useQuery(GetTransactionsDocument, {
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

  const currencyFormatter = (params: ValueFormatterParams) => {
    return NumberUtils.formatAsMoney(params.value);
  };

  const descriptionGetter = (params: ValueGetterParams) => {
    const transaction: Transaction = params.data;
    switch (transaction.type) {
      case TransactionType.CashTransfer:
        const transfer = transaction as CashTransfer;
        const { direction } = transfer;
        return `Transfer ${direction === Direction.In ? 'in' : 'out'}`;
      case TransactionType.Trade:
        const trade = transaction as Trade;
        const { price, quantity, security, side } = trade;
        return `${side === Side.Buy ? 'Bought' : 'Sold'} ${NumberUtils.format(
          quantity,
          '0,0'
        )} shares of ${security.id} @ ${NumberUtils.formatAsMoney(price)}`;
    }
  };

  const { transactions } = data;

  const columnDefs: Array<ColDef> = [
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 130,
      suppressSizeToFit: true,
      valueFormatter: (params) =>
        params.value.toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      filter: 'agDateColumnFilter',
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 100,
      suppressSizeToFit: true,
      valueFormatter: (params) =>
        TransactionTypeLookup[params.value as TransactionType],
    },
    {
      headerName: 'Description',
      valueGetter: descriptionGetter,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 140,
      suppressSizeToFit: true,
      type: 'rightAligned',
      valueFormatter: currencyFormatter,
      filter: 'agNumberColumnFilter',
    },
  ];

  return (
    <VerticalContainer className="p-2">
      <VerticalContainer className="paper border-paper p-2">
        <GridContextProvider>
          <HorizontalContainer className="items-center mb-2">
            <h1 className="title flex-1">Activity</h1>
            <GridToolbar />
          </HorizontalContainer>
          <CustomGrid columnDefs={columnDefs} rowData={transactions} />
        </GridContextProvider>
      </VerticalContainer>
    </VerticalContainer>
  );
};
