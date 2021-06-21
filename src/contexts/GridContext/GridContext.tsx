import React, { useContext, useState } from 'react';
import { ColumnApi, GridApi } from 'ag-grid-community';

// ---------- GridContext ----------
type GridState = {
  gridApi?: GridApi;
  columnApi?: ColumnApi;
};
type GridStateSetter = (gridState: GridState) => void;

/** GridContext contains GridState and GridStateSetter */
const GridContext = React.createContext<
  { gridState: GridState; setGridState: GridStateSetter } | undefined
>(undefined);

// ---------- GridContextProvider ----------
const GridContextProvider: React.FC = ({ children }) => {
  const [gridState, setGridState] = useState<GridState>({});

  const value = { gridState, setGridState };
  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
};

// ---------- useGridContext ----------
function useGridContext() {
  const gridContext = useContext(GridContext);
  /* istanbul ignore next */
  if (gridContext === undefined) {
    throw new Error('useGridContext must be used within a GridContextProvider');
  }
  return gridContext;
}

export { GridContextProvider, useGridContext };
