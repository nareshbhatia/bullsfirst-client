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
import { GetHoldingsDocument } from '../../../graphql';
import { ActionsRenderer } from './ActionsRenderer';

export const Holdings = () => {
  const { accountId } = useParams();
  const { refreshCount } = useRefreshContext();
  const { loading, error, data, refetch } = useQuery(GetHoldingsDocument, {
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
  if (!data) {
    throw new Error('Something went wrong');
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
      width: 120,
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
    {
      field: 'actions',
      headerName: '',
      cellRenderer: 'actionsRenderer',
      width: 148,
      suppressSizeToFit: true,
      // suppress column menu, sorting and filtering
      menuTabs: [],
      resizable: false,
      sortable: false,
      filter: false,
    },
  ];

  const frameworkComponents = {
    actionsRenderer: ActionsRenderer,
  };

  return (
    <VerticalContainer className="p-2">
      <VerticalContainer className="paper border-paper p-2">
        <GridContextProvider>
          <HorizontalContainer className="items-center mb-2">
            <h1 className="title flex-1">Holdings</h1>
            <GridToolbar />
          </HorizontalContainer>
          <CustomGrid
            columnDefs={columnDefs}
            frameworkComponents={frameworkComponents}
            rowData={holdings}
          />
        </GridContextProvider>
      </VerticalContainer>
    </VerticalContainer>
  );
};
