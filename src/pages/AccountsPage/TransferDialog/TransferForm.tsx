import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { HorizontalContainer, NumberField } from '../../../components';
import { Direction, TransferCashInput } from '../../../graphql';
import { useAccountContext } from '../AccountContext';
import { DirectionToggle } from './DirectionToggle';
import { useTransferContext } from './TransferContext';
import './TransferForm.css';

const schema = yup.object().shape({
  amount: yup.number().required(),
});

export interface TransferFormProps {
  defaultValues: Omit<TransferCashInput, 'amount'>;
  onSubmit: (transferCashInput: TransferCashInput) => void;
}

export const TransferForm = ({
  defaultValues,
  onSubmit,
}: TransferFormProps) => {
  const { accountState } = useAccountContext();
  const { account } = accountState;

  const { setTransferState } = useTransferContext();
  const { control, formState, handleSubmit, setValue, watch } =
    useForm<TransferCashInput>({
      mode: 'onBlur',
      resolver: yupResolver(schema),
      defaultValues,
    });
  const { errors } = formState;
  const direction = watch('direction');
  const bgColor = direction === Direction.In ? 'bg-xfer-in' : 'bg-xfer-out';
  const titleColor =
    direction === Direction.In ? 'color-xfer-in' : 'color-xfer-out';

  const handleDiscard = () => {
    setTransferState({ showDialog: false });
  };

  const handleDirectionToggle = () => {
    setValue(
      'direction',
      direction === Direction.In ? Direction.Out : Direction.In
    );
  };

  return (
    <form
      className={`transfer-form ${bgColor}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <HorizontalContainer>
        <h1 className={`dialog-title flex-1 ${titleColor}`}>
          XFER {direction === Direction.In ? 'IN' : 'OUT'}
        </h1>
        <DirectionToggle
          direction={direction === Direction.In ? Direction.Out : Direction.In}
          onClick={handleDirectionToggle}
        />
      </HorizontalContainer>
      <p className={`mb-4 ${titleColor}`}>{account?.name}</p>

      <div className="mb-4">
        <NumberField
          id="amount"
          name="amount"
          decimalScale={2}
          control={control}
          label="Amount"
          error={errors.amount?.message}
        />
      </div>

      <HorizontalContainer className="justify-end">
        <button
          className="btn-sm btn-outline-secondary"
          type="button"
          onClick={handleDiscard}
        >
          Discard
        </button>

        <button className="btn-sm btn-secondary ml-1" type="submit">
          Submit
        </button>
      </HorizontalContainer>
    </form>
  );
};
