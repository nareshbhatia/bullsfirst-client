import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
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
import { GetHoldings } from './__generated__/GetHoldings';

export const GET_HOLDINGS = gql`
  query GetHoldings($accountId: ID!) {
    holdings(accountId: $accountId) {
      id
      quantity
      value
      security {
        id
        name
        price
      }
    }
  }
`;

export const Holdings = () => {
  const { accountId } = useParams();
  const { refreshCount } = useRefreshContext();
  const { loading, data, refetch } = useQuery<GetHoldings>(GET_HOLDINGS, {
    variables: {
      accountId,
    },
  });

  useEffect(() => {
    refetch();
  }, [refreshCount, refetch]);

  if (loading || !data) {
    return <Loading />;
  }

  const currencyFormatter = (params: ValueFormatterParams) => {
    return NumberUtils.formatAsMoney(params.value);
  };

  const intFormatter = (params: ValueFormatterParams) => {
    return NumberUtils.format(params.value, '0,0');
  };

  const { holdings } = data;

  const columnDefs: Array<ColDef> = [
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
      width: 130,
      suppressSizeToFit: true,
      type: 'rightAligned',
      valueFormatter: intFormatter,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'security.price',
      headerName: 'Price',
      width: 130,
      suppressSizeToFit: true,
      type: 'rightAligned',
      valueFormatter: currencyFormatter,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'value',
      headerName: 'Value',
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
            <h1 className="title flex-1">Holdings</h1>
            <GridToolbar />
          </HorizontalContainer>
          <CustomGrid columnDefs={columnDefs} rowData={holdings} />
        </GridContextProvider>
      </VerticalContainer>
    </VerticalContainer>
  );
};
