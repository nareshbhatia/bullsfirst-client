import { ICellRendererParams } from 'ag-grid-community';

export const ActionsRenderer = ({ data }: ICellRendererParams) => {
  const btnClickedHandler = () => {
    alert(data.security.id);
  };

  return (
    <div className="flex items-center justify-between h-full">
      <button className="btn-xs btn-outline-buy" onClick={btnClickedHandler}>
        Buy
      </button>
      <button className="btn-xs btn-outline-sell" onClick={btnClickedHandler}>
        Sell
      </button>
    </div>
  );
};
