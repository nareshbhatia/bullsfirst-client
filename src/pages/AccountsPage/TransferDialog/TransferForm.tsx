import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { HorizontalContainer, NumberField } from '../../../components';
import { Direction, TransferCashInput } from '../../../graphql';
import { useAccountContext } from '../AccountContext';
import { DirectionToggle } from './DirectionToggle';
import { TransferDefaults, useTransferContext } from './TransferContext';
import './TransferForm.css';

const schema = yup.object().shape({
  accountId: yup.string().required(),
  direction: yup.string().required(),
  amount: yup.number().required(),
});

export interface TransferFormProps {
  transferDefaults: TransferDefaults;
  onSubmit: (transferCashInput: TransferCashInput) => void;
}

export const TransferForm = ({
  transferDefaults,
  onSubmit,
}: TransferFormProps) => {
  const { accountState } = useAccountContext();
  const { account } = accountState;

  const { setTransferState } = useTransferContext();
  const { control, formState, handleSubmit, setValue, watch } =
    useForm<TransferCashInput>({
      mode: 'onBlur',
      resolver: yupResolver(schema),
      defaultValues: transferDefaults,
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
        <h2 className={`dialog-title flex-1 ${titleColor}`}>
          TRANSFER {direction === Direction.In ? 'IN' : 'OUT'}
        </h2>
        <DirectionToggle
          direction={direction === Direction.In ? Direction.Out : Direction.In}
          onClick={handleDirectionToggle}
        />
      </HorizontalContainer>
      <p data-testid="transfer-account" className={`mb-4 ${titleColor}`}>
        {account?.name}
      </p>

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
