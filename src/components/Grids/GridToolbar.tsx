import React from 'react';
import { CgArrowsHAlt, CgArrowsShrinkH } from 'react-icons/cg';
import { useGridContext } from '../../contexts';

export const GridToolbar = () => {
  const { gridState } = useGridContext();
  const { columnApi, gridApi } = gridState;

  const handleSizeToFit = () => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  };

  const handleAutoSize = () => {
    if (columnApi) {
      columnApi.autoSizeAllColumns();
    }
  };

  return (
    <div>
      <button
        className="btn-icon mr-1"
        title="Size to Fit"
        onClick={handleSizeToFit}
      >
        <CgArrowsShrinkH />
      </button>
      <button className="btn-icon" title="Auto-Size" onClick={handleAutoSize}>
        <CgArrowsHAlt />
      </button>
    </div>
  );
};
