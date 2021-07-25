import { graphql, GraphQLRequest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import accounts from './data/accounts.json';
import cashBalances from './data/cash-balances.json';
import holdings from './data/holdings.json';
import industries from './data/industries.json';
import orders from './data/orders.json';
import performances from './data/performances.json';
import sectors from './data/sectors.json';
import securities from './data/securities.json';
import transactions from './data/transactions.json';
import {
  AssetAllocation,
  CashBalance,
  CashTransfer,
  DbUser,
  Holding,
  Industry,
  Order,
  Sector,
  Security,
  Series,
  Trade,
  Transaction,
} from './models';
import { mockDb } from './mockDb';
import {
  Direction,
  OrderInput,
  OrderStatus,
  OrderType,
  Side,
  TransactionType,
  TransferCashInput,
} from '../graphql';

const {
  createUser,
  getUser,
  getUserByEmail,
  getTokenValue,
  setTokenValue,
  removeToken,
} = mockDb;

function parseAccessToken(req: GraphQLRequest<any>) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return;
  }

  const scheme = parts[0];
  const accessToken = parts[1];

  if (scheme === 'Bearer') {
    return accessToken;
  }
}

function getUserFromRequest(req: GraphQLRequest<any>): DbUser | undefined {
  const accessToken = parseAccessToken(req);
  if (!accessToken) {
    return;
  }

  const userId = getTokenValue(accessToken);
  if (!userId) {
    return;
  }

  return getUser(userId);
}

const getIndustry = (industryId: string): Industry | undefined => {
  return industries.find((industry) => industry.id === industryId);
};

const getSector = (sectorId: string): Sector | undefined => {
  return sectors.find((sector) => sector.id === sectorId);
};

const getSecurity = (symbol: string): Security | undefined => {
  return securities.find((security) => security.id === symbol);
};

const getCashBalance = (accountId: string): CashBalance | undefined => {
  return cashBalances.find((cashBalance) => cashBalance.id === accountId);
};

const getHolding = (accountId: string, symbol: string): Holding | undefined => {
  return holdings.find(
    (holding) => holding.accountId === accountId && holding.symbol === symbol
  );
};

const getAccountHoldings = (accountId: string): Array<Holding> => {
  return holdings.filter((holding) => holding.accountId === accountId);
};

const getAccountOrders = (accountId: string): Array<Order> => {
  return orders.filter((order) => order.accountId === accountId);
};

const getAccountTransactions = (accountId: string): Array<Transaction> => {
  return (transactions as Array<Transaction>).filter(
    (transaction) => transaction.accountId === accountId
  );
};

const transferCash = (
  userId: string,
  transferCashInput: TransferCashInput
): CashTransfer => {
  const { accountId, direction, amount } =
    transferCashInput as TransferCashInput;

  const cashBalance = getCashBalance(accountId);
  if (cashBalance === undefined) {
    throw new Error('Account not found');
  }

  if (direction === Direction.In) {
    cashBalance.balance += amount;
  } else {
    if (cashBalance.balance < amount) {
      throw new Error('Insufficient funds');
    }
    cashBalance.balance -= amount;
  }

  const cashTransfer: CashTransfer = {
    __typename: 'CashTransfer',
    id: uuidv4(),
    type: 'CASH_TRANSFER',
    accountId,
    createdAt: new Date().toISOString(),
    createdBy: userId,
    direction,
    amount: direction === Direction.In ? amount : -amount,
  };
  transactions.push(cashTransfer);

  return cashTransfer;
};

// Returns an order, but we don't specify a return type because it is in the wire format
const placeOrder = (userId: string, orderInput: OrderInput) => {
  const { accountId, side, symbol, quantity, type, limitPrice } =
    orderInput as OrderInput;

  // get cash balance in the account
  const cashBalance = getCashBalance(accountId);
  if (cashBalance === undefined) {
    throw new Error('Account not found');
  }

  // get existing holdings in the account (if any)
  let holding = getHolding(accountId, symbol);

  // get the data for the security that needs to be traded
  const security = getSecurity(symbol);
  if (security === undefined) {
    throw new Error('Security not found');
  }

  // compute total market price for the order based on the current security price
  const totalMarketPrice = quantity * security.price;

  // assume that the order is executable
  let executable = true;

  // if limit price is not met, then mark executable = false
  if (type === OrderType.Limit) {
    if (limitPrice === undefined || limitPrice === null) {
      throw new Error('Limit price not specified');
    }

    switch (side) {
      case Side.Buy:
        if (security.price > limitPrice) {
          executable = false;
        }
        break;
      case Side.Sell:
        if (security.price < limitPrice) {
          executable = false;
        }
        break;
    }
  }

  // validate for cash or holdings availability
  if (executable) {
    switch (side) {
      case Side.Buy:
        if (cashBalance.balance < totalMarketPrice) {
          throw new Error('Insufficient funds');
        }
        break;
      case Side.Sell:
        if (holding === undefined || holding.quantity < quantity) {
          throw new Error(`Insufficient shares of ${symbol} in your account`);
        }
        break;
    }
  }

  // at this point the order is valid, record it
  const now = new Date().toISOString();
  const order: Order = {
    __typename: 'Order',
    id: uuidv4(),
    side,
    symbol,
    quantity,
    type,
    limitPrice: limitPrice ? limitPrice : null,
    status: OrderStatus.Placed,
    accountId,
    createdAt: now,
    createdBy: userId,
  };
  // @ts-ignore
  orders.push(order);

  // now execute it (if it is executable, otherwise it just sits as PLACED)
  if (executable) {
    switch (side) {
      case Side.Buy:
        cashBalance.balance -= totalMarketPrice;
        if (holding) {
          holding.quantity += quantity;
        } else {
          holding = {
            __typename: 'Holding',
            id: uuidv4(),
            symbol,
            quantity,
            accountId,
          };
          holdings.push(holding);
        }
        break;
      case Side.Sell:
        cashBalance.balance += totalMarketPrice;
        // should always be true
        if (holding) {
          holding.quantity -= quantity;
          if (holding.quantity <= 0) {
            // remove holding
            const index = holdings.findIndex(
              (holding) => holding.symbol === symbol
            );
            if (index >= 0) {
              holdings.splice(index, 1);
            }
          }
        }
        break;
    }

    // create the transaction
    const trade: Trade = {
      __typename: 'Trade',
      id: uuidv4(),
      type: 'TRADE',
      accountId,
      createdAt: now,
      createdBy: userId,
      side,
      symbol,
      quantity,
      price: security.price,
      amount: side === Side.Buy ? -totalMarketPrice : totalMarketPrice,
    };
    transactions.push(trade);

    // mark the order as executed
    order.status = OrderStatus.Executed;
  }

  const { accountId: _, symbol: __, ...orderFields } = order;
  return {
    ...orderFields,
    security: {
      __typename: 'Security',
      id: security.id,
      name: security.name,
    },
  };
};

const getAccountPerformance = (
  accountId: string
): Array<Series> | undefined => {
  const accountPerformance = performances.find(
    (accountPerformance) => accountPerformance.id === accountId
  );
  return accountPerformance?.performance;
};

export const handlers = [
  /** get user */
  graphql.query('GetUser', (req, res, ctx) => {
    const existingUser = getUserFromRequest(req);
    if (!existingUser) {
      return res(
        ctx.errors([{ message: 'Unauthorized', errorType: 'Unauthorized' }])
      );
    }

    const { password, ...user } = existingUser;
    return res(ctx.data({ user }));
  }),

  /** sign in */
  graphql.mutation('SignIn', (req, res, ctx) => {
    const { credentials } = req.variables;

    const existingUser = getUserByEmail(credentials.email);
    if (!existingUser || existingUser.password !== credentials.password) {
      return res(
        ctx.errors([
          {
            message: 'Email or password did not match',
            errorType: 'Unauthorized',
          },
        ])
      );
    }

    const accessToken = uuidv4();
    setTokenValue(accessToken, existingUser.id);

    const { password, ...user } = existingUser;
    return res(
      ctx.data({
        signIn: {
          __typename: 'UserInfo',
          user,
          accessToken,
        },
      })
    );
  }),

  /** sign out */
  graphql.mutation('SignOut', (req, res, ctx) => {
    const accessToken = parseAccessToken(req);
    if (!accessToken) {
      return res(
        ctx.errors([{ message: 'Unauthorized', errorType: 'Unauthorized' }])
      );
    }

    removeToken(accessToken);
    return res(
      ctx.data({
        signOut: accessToken,
      })
    );
  }),

  /** sign up */
  graphql.mutation('SignUp', (req, res, ctx) => {
    const { signUpInput } = req.variables;

    const existingUser = getUserByEmail(signUpInput.email);
    if (existingUser) {
      return res(
        ctx.errors([
          {
            message: 'The user already exists',
            errorType: 'Unauthorized',
          },
        ])
      );
    }

    const userId = uuidv4();
    const accessToken = uuidv4();
    const newUser: DbUser = { __typename: 'User', id: userId, ...signUpInput };
    createUser(newUser);
    setTokenValue(accessToken, newUser.id);

    const { password, ...user } = newUser;
    return res(
      ctx.data({
        signUp: {
          __typename: 'UserInfo',
          user,
          accessToken,
        },
      })
    );
  }),

  /** get securities */
  graphql.query('GetSecurities', (req, res, ctx) => {
    const { query } = req.variables;

    const filtered = securities.filter(
      (security) =>
        security.id.toLowerCase().includes(query.toLowerCase()) ||
        security.name.toLowerCase().includes(query.toLowerCase())
    );

    return res(
      ctx.data({
        securities: filtered.map((security) => ({
          __typename: 'Security',
          id: security.id,
          name: security.name,
        })),
      })
    );
  }),

  /** get accounts */
  graphql.query('GetAccounts', (req, res, ctx) => {
    return res(ctx.data({ accounts }));
  }),

  /** get net worth */
  graphql.query('GetNetWorth', (req, res, ctx) => {
    const { accountId } = req.variables;

    const cashBalance = getCashBalance(accountId);
    const accountHoldings = getAccountHoldings(accountId);
    const investmentTotal = accountHoldings.reduce(
      (accumulator: number, holding: Holding) => {
        const security = getSecurity(holding.symbol);
        return security
          ? accumulator + security.price * holding.quantity
          : accumulator;
      },
      0
    );

    return res(
      ctx.data({
        account: {
          __typename: 'Account',
          id: accountId,
          investmentTotal,
          cashBalance: cashBalance !== undefined ? cashBalance.balance : 0,
        },
      })
    );
  }),

  /** get asset allocations */
  graphql.query('GetAssetAllocations', (req, res, ctx) => {
    const { accountId } = req.variables;
    const accountHoldings = getAccountHoldings(accountId);

    // iterate through holdings and start creating asset allocations
    const sectorAllocations: Array<AssetAllocation> = [];
    accountHoldings.forEach((holding) => {
      const { symbol } = holding;
      const security = getSecurity(symbol);
      if (security) {
        const { industryId } = security;
        const industry = getIndustry(industryId);
        if (industry) {
          const { name: industryName, sectorId } = industry;
          const sector = getSector(sectorId);
          if (sector) {
            const { name: sectorName } = sector;

            // create a sector allocation if needed
            let sectorAllocation = sectorAllocations.find(
              (allocation) => allocation.categoryId === sectorId
            );
            if (sectorAllocation === undefined) {
              sectorAllocation = {
                __typename: 'AssetAllocation',
                categoryId: sectorId,
                categoryName: sectorName,
                value: 0,
                percentage: 0,
                children: [],
              };
              sectorAllocations.push(sectorAllocation);
            }
            const { children: industryAllocations } = sectorAllocation;

            // create a industryAllocation if needed
            let industryAllocation = industryAllocations!.find(
              (allocation) => allocation.categoryId === industryId
            );
            if (industryAllocation === undefined) {
              industryAllocation = {
                __typename: 'AssetAllocation',
                categoryId: industryId,
                categoryName: industryName,
                value: 0,
                percentage: 0,
              };
              industryAllocations!.push(industryAllocation);
            }

            // calculate value and add to sector and industry allocations
            const value = security.price * holding.quantity;
            sectorAllocation.value += value;
            industryAllocation.value += value;
          }
        }
      }
    });

    // calculate total account value as the sum of all sector values
    const accountValue = sectorAllocations.reduce(
      (accumulator: number, sectorAllocation: AssetAllocation) => {
        return accumulator + sectorAllocation.value;
      },
      0
    );

    // calculate sector allocation percentages
    sectorAllocations.forEach((sectorAllocation) => {
      sectorAllocation.percentage = sectorAllocation.value / accountValue;

      // calculate industry allocation percentages
      const { children: industryAllocations } = sectorAllocation;
      industryAllocations!.forEach((industryAllocation) => {
        industryAllocation.percentage =
          industryAllocation.value / sectorAllocation.value;
      });
    });

    return res(
      ctx.data({
        account: {
          __typename: 'Account',
          id: accountId,
          assetAllocations: sectorAllocations,
        },
      })
    );
  }),

  /** get account performance */
  graphql.query('GetAccountPerformance', (req, res, ctx) => {
    const { accountId } = req.variables;

    return res(
      ctx.data({
        account: {
          __typename: 'Account',
          id: accountId,
          performance: getAccountPerformance(accountId),
        },
      })
    );
  }),

  /** get account holdings */
  graphql.query('GetHoldings', (req, res, ctx) => {
    const { accountId } = req.variables;
    const accountHoldings = getAccountHoldings(accountId);

    return res(
      ctx.data({
        holdings: accountHoldings.map((holding) => {
          const { accountId, symbol, ...holdingFields } = holding;
          const security = getSecurity(symbol);
          return security
            ? {
                ...holdingFields,
                value: security.price * holding.quantity,
                security: {
                  __typename: 'Security',
                  id: security.id,
                  name: security.name,
                  price: security.price,
                },
              }
            : { ...holdingFields };
        }),
      })
    );
  }),

  /** get account orders */
  graphql.query('GetOrders', (req, res, ctx) => {
    const { accountId } = req.variables;
    const accountOrders = getAccountOrders(accountId);

    return res(
      ctx.data({
        orders: accountOrders.map((order) => {
          const { accountId, symbol, ...orderFields } = order;
          const security = getSecurity(symbol);
          return security
            ? {
                ...orderFields,
                security: {
                  __typename: 'Security',
                  id: security.id,
                  name: security.name,
                },
              }
            : { ...orderFields };
        }),
      })
    );
  }),

  /** get account transactions */
  graphql.query('GetTransactions', (req, res, ctx) => {
    const { accountId } = req.variables;
    const accountTransactions = getAccountTransactions(accountId);

    return res(
      ctx.data({
        transactions: accountTransactions.map((t) => {
          switch (t.type) {
            case TransactionType.CashTransfer:
              return {
                __typename: 'CashTransfer',
                id: t.id,
                type: t.type,
                createdAt: t.createdAt,
                createdBy: t.createdBy,
                direction: t.direction,
                amount: t.amount,
              };
            case TransactionType.Trade:
              const security = getSecurity(t.symbol);
              return {
                __typename: 'Trade',
                id: t.id,
                type: t.type,
                createdAt: t.createdAt,
                createdBy: t.createdBy,
                side: t.side,
                security: {
                  id: security?.id,
                  name: security?.name,
                },
                quantity: t.quantity,
                price: t.price,
                amount: t.amount,
              };
            default:
              return null;
          }
        }),
      })
    );
  }),

  /** transfer cash */
  graphql.mutation('TransferCash', (req, res, ctx) => {
    const user = getUserFromRequest(req);
    if (!user) {
      return res(
        ctx.errors([{ message: 'Unauthorized', errorType: 'Unauthorized' }])
      );
    }
    const { transferCashInput } = req.variables;

    try {
      const cashTransfer = transferCash(user.id, transferCashInput);
      return res(
        ctx.data({
          transferCash: cashTransfer,
        })
      );
    } catch (e) {
      return res(
        ctx.errors([
          {
            message: e.message,
            errorType: 'OperationFailed',
          },
        ])
      );
    }
  }),

  /** place order */
  graphql.mutation('PlaceOrder', (req, res, ctx) => {
    const user = getUserFromRequest(req);
    if (!user) {
      return res(
        ctx.errors([{ message: 'Unauthorized', errorType: 'Unauthorized' }])
      );
    }
    const { orderInput } = req.variables;

    try {
      const order = placeOrder(user.id, orderInput);
      return res(
        ctx.data({
          placeOrder: order,
        })
      );
    } catch (e) {
      return res(
        ctx.errors([
          {
            message: e.message,
            errorType: 'OperationFailed',
          },
        ])
      );
    }
  }),
];
