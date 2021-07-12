import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { NumberUtils } from '@react-force/number-utils';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
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
  GetOrdersDocument,
  OrderStatus,
  OrderStatusLookup,
  OrderType,
  OrderTypeLookup,
  Side,
  SideLookup,
} from '../../../graphql';

export const Orders = () => {
  const { accountId } = useParams();
  const { refreshCount } = useRefreshContext();
  const { loading, error, data, refetch } = useQuery(GetOrdersDocument, {
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

  const intFormatter = (params: ValueFormatterParams) => {
    return NumberUtils.format(params.value, '0,0');
  };

  const { orders } = data;

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
      field: 'side',
      headerName: 'Side',
      width: 80,
      suppressSizeToFit: true,
      valueFormatter: (params) => SideLookup[params.value as Side],
    },
    {
      field: 'security.id',
      headerName: 'Symbol',
      width: 100,
      suppressSizeToFit: true,
    },
    {
      field: 'security.name',
      headerName: 'Name',
    },
    {
      field: 'quantity',
      headerName: 'Qty',
      width: 120,
      suppressSizeToFit: true,
      type: 'rightAligned',
      valueFormatter: intFormatter,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 100,
      suppressSizeToFit: true,
      valueFormatter: (params) => OrderTypeLookup[params.value as OrderType],
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      suppressSizeToFit: true,
      valueFormatter: (params) =>
        OrderStatusLookup[params.value as OrderStatus],
    },
  ];

  return (
    <VerticalContainer className="p-2">
      <VerticalContainer className="paper border-paper p-2">
        <GridContextProvider>
          <HorizontalContainer className="items-center mb-2">
            <h1 className="title flex-1">Orders</h1>
            <GridToolbar />
          </HorizontalContainer>
          <CustomGrid columnDefs={columnDefs} rowData={orders} />
        </GridContextProvider>
      </VerticalContainer>
    </VerticalContainer>
  );
};
