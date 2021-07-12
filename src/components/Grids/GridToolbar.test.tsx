import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GridToolbar } from './GridToolbar';
import { GridContextProvider, useGridContext } from '../../contexts';
import { ColumnApi, GridApi } from 'ag-grid-community';

const gridApi = {
  sizeColumnsToFit: jest.fn(),
} as unknown as GridApi;
const columnApi = {
  autoSizeAllColumns: jest.fn(),
} as unknown as ColumnApi;

const MockGrid = () => {
  const { setGridState } = useGridContext();

  useEffect(() => {
    setGridState({
      gridApi,
      columnApi,
    });
  }, [setGridState]);

  return null;
};

describe('<GridToolbar />', () => {
  test('clicking on Size To Fit button calls gridApi.sizeColumnsToFit()', async () => {
    const { getByTitle } = render(
      <GridContextProvider>
        <GridToolbar />
        <MockGrid />
      </GridContextProvider>
    );

    userEvent.click(getByTitle('Size to Fit'));
    expect(gridApi.sizeColumnsToFit).toBeCalledTimes(1);
  });

  test('clicking on Auto-Size button calls columnApi.autoSizeAllColumns()', async () => {
    const { getByTitle } = render(
      <GridContextProvider>
        <GridToolbar />
        <MockGrid />
      </GridContextProvider>
    );

    userEvent.click(getByTitle('Auto-Size'));
    expect(columnApi.autoSizeAllColumns).toBeCalledTimes(1);
  });
});
