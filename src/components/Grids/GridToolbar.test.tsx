import React, { useEffect } from 'react';
import { GridToolbar } from './GridToolbar';
import { GridContextProvider, useGridContext } from '../../contexts';
import { render, screen, userEvent } from '../../test/test-utils';
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
    render(
      <GridContextProvider>
        <GridToolbar />
        <MockGrid />
      </GridContextProvider>
    );

    userEvent.click(screen.getByTitle('Size to Fit'));
    expect(gridApi.sizeColumnsToFit).toBeCalledTimes(1);
  });

  test('clicking on Auto-Size button calls columnApi.autoSizeAllColumns()', async () => {
    render(
      <GridContextProvider>
        <GridToolbar />
        <MockGrid />
      </GridContextProvider>
    );

    userEvent.click(screen.getByTitle('Auto-Size'));
    expect(columnApi.autoSizeAllColumns).toBeCalledTimes(1);
  });
});
