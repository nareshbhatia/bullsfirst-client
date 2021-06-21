import React from 'react';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useGridContext } from '../../contexts';

export interface CustomGridProps {
  columnDefs: Array<ColDef>;
  rowData: Array<any>;
}

export const CustomGrid = ({ columnDefs, rowData }: CustomGridProps) => {
  const { setGridState } = useGridContext();

  const handleGridReady = (event: GridReadyEvent) => {
    // save gridApi and columnApi in context so that other components can use it
    const { api: gridApi, columnApi } = event;
    setGridState({
      gridApi,
      columnApi,
    });
    gridApi.sizeColumnsToFit();
  };

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    menuTabs: ['filterMenuTab'],
  };

  const gridOptions: GridOptions = {
    suppressCellSelection: true,
    defaultColDef,
    columnDefs,
    rowData,
    onGridReady: handleGridReady,
  };

  return (
    <div className="ag-theme-alpine h-full w-full">
      <AgGridReact gridOptions={gridOptions} />
    </div>
  );
};
