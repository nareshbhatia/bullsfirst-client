import { graphql, GraphQLRequest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import accounts from './data/accounts.json';
import cashBalances from './data/cash-balances.json';
import holdings from './data/holdings.json';
import industries from './data/industries.json';
import performances from './data/performances.json';
import sectors from './data/sectors.json';
import securities from './data/securities.json';
import {
  AssetAllocation,
  Holding,
  Industry,
  Sector,
  Security,
  Series,
} from './models';
import { mockDb } from './mockDb';

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

const getAccountCashBalance = (accountId: string): number => {
  const cashBalance = cashBalances.find(
    (cashBalance) => cashBalance.id === accountId
  );
  return cashBalance ? cashBalance.balance : 0;
};

const getAccountHoldings = (accountId: string): Array<Holding> => {
  return holdings.filter((holding) => holding.accountId === accountId);
};

const getAccountPerformance = (
  accountId: string
): Array<Series> | undefined => {
  const accountPerformance = performances.find(
    (accountPerformance) => accountPerformance.id === accountId
  );
  return accountPerformance?.performance;
};

const getIndustry = (industryId: string): Industry | undefined => {
  return industries.find((industry) => industry.id === industryId);
};

const getSector = (sectorId: string): Sector | undefined => {
  return sectors.find((sector) => sector.id === sectorId);
};

const getSecurity = (symbol: string): Security | undefined => {
  return securities.find((security) => security.id === symbol);
};

export const handlers = [
  /** get user */
  graphql.query('GetUser', (req, res, ctx) => {
    const accessToken = parseAccessToken(req);
    if (!accessToken) {
      return res(
        ctx.errors([{ message: 'Unauthorized', errorType: 'Unauthorized' }])
      );
    }

    const userId = getTokenValue(accessToken);
    if (!userId) {
      return res(
        ctx.errors([{ message: 'Unauthorized', errorType: 'Unauthorized' }])
      );
    }

    const existingUser = getUser(userId);
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
          user,
          accessToken: accessToken,
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
    const newUser = { id: userId, ...signUpInput };
    createUser(newUser);
    setTokenValue(accessToken, newUser.id);

    const { password, ...user } = newUser;
    return res(
      ctx.data({
        signUp: {
          user,
          accessToken: accessToken,
        },
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

    const cashBalance = getAccountCashBalance(accountId);
    const accountHoldings = getAccountHoldings(accountId);
    const investments = accountHoldings.reduce(
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
        netWorthInfo: {
          netWorth: investments + cashBalance,
          investments: investments,
          cash: cashBalance,
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
              (allocation) => allocation.id === sectorId
            );
            if (sectorAllocation === undefined) {
              sectorAllocation = {
                id: sectorId,
                name: sectorName,
                value: 0,
                percentage: 0,
                children: [],
              };
              sectorAllocations.push(sectorAllocation);
            }
            const { children: industryAllocations } = sectorAllocation;

            // create a industryAllocation if needed
            let industryAllocation = industryAllocations!.find(
              (allocation) => allocation.id === industryId
            );
            if (industryAllocation === undefined) {
              industryAllocation = {
                id: industryId,
                name: industryName,
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

    return res(ctx.data({ assetAllocations: sectorAllocations }));
  }),

  /** get account performance */
  graphql.query('GetAccountPerformance', (req, res, ctx) => {
    const { accountId } = req.variables;

    return res(
      ctx.data({
        accountPerformance: getAccountPerformance(accountId),
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
          const security = getSecurity(holding.symbol);
          return security
            ? {
                id: holding.id,
                quantity: holding.quantity,
                value: security.price * holding.quantity,
                security: {
                  id: security.id,
                  name: security.name,
                  price: security.price,
                },
              }
            : holding;
        }),
      })
    );
  }),
];
