import { Maybe } from '../graphql';
import { User } from '../models';

export type UserId = string;

export interface DbUser extends User {
  __typename: string;
  password: string;
}

export interface AssetAllocation {
  __typename: string;
  categoryId: string;
  categoryName: string;
  value: number;
  percentage: number;
  children?: Array<AssetAllocation>;
}

/**
 * Defines a series of data points.
 *
 * Example:
 * {
 *   name: 'Brokerage Account',
 *   data: [
 *     {x: 2015, y: 0},
 *     {x: 2016, y: -4.7},
 *     {x: 2017, y: 24.5}
 *   ]
 * }
 */

export interface DataPoint {
  x: number;
  y: number;
}

export interface Series {
  name: string;
  data: Array<DataPoint>;
}

export interface CashBalance {
  id: string;
  balance: number;
}

export interface Holding {
  __typename: string;
  id: string;
  symbol: string;
  quantity: number;
  accountId: string;
}

export interface Order {
  __typename: string;
  id: string;
  side: string;
  symbol: string;
  quantity: number;
  type: string;
  limitPrice: Maybe<number> | undefined;
  status: string;
  accountId: string;
  createdAt: string;
  createdBy: string;
}

export type CashTransfer = {
  __typename: string;
  id: string;
  type: 'CASH_TRANSFER';
  accountId: string;
  createdAt: string;
  createdBy: string;
  direction: string;
  amount: number;
};

export type Trade = {
  __typename: string;
  id: string;
  type: 'TRADE';
  accountId: string;
  createdAt: string;
  createdBy: string;
  side: string;
  symbol: string;
  quantity: number;
  price: number;
  amount: number;
};

export type Transaction = CashTransfer | Trade;

export interface Sector {
  id: string;
  name: string;
}

export interface Industry {
  id: string;
  name: string;
  sectorId: string;
}

export interface Security {
  id: string;
  name: string;
  price: number;
  industryId: string;
}
