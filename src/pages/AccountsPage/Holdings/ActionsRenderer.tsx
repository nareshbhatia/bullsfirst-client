import { ICellRendererParams } from 'ag-grid-community';
import { HoldingFieldsFragment, OrderType, Side } from '../../../graphql';
import { useOrderContext } from '../OrderDialog';
import { useAccountContext } from '../AccountContext';

export const ActionsRenderer = ({ data }: ICellRendererParams) => {
  const { accountState } = useAccountContext();
  const { setOrderState } = useOrderContext();

  const { account } = accountState;
  const { quantity, security } = data as HoldingFieldsFragment;

  const handleClick = (side: Side) => {
    if (account) {
      setOrderState({
        showDialog: true,
        orderDefaults: {
          accountId: account?.id,
          side,
          symbol: security.id,
          quantity,
          type: OrderType.Market,
        },
      });
    }
  };

  return (
    <div className="flex items-center justify-between h-full">
      <button
        className="btn-xs btn-outline-buy"
        onClick={() => handleClick(Side.Buy)}
      >
        Buy
      </button>
      <button
        className="btn-xs btn-outline-sell"
        onClick={() => handleClick(Side.Sell)}
      >
        Sell
      </button>
    </div>
  );
};
