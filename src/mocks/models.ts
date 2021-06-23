import { User } from '../models';

export type UserId = string;

export interface DbUser extends User {
  password: string;
}

export interface AssetAllocation {
  id: string;
  name: string;
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

export interface Holding {
  id: string;
  symbol: string;
  quantity: number;
  accountId: string;
}

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
