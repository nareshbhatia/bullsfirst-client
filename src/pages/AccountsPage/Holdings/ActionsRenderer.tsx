import { ICellRendererParams } from 'ag-grid-community';
import { useOrderContext } from '../OrderDialog';

export const ActionsRenderer = ({ data }: ICellRendererParams) => {
  const { setOrderState } = useOrderContext();

  const btnClickedHandler = () => {
    setOrderState({ showDialog: true });
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
