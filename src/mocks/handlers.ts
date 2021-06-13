import { graphql, GraphQLRequest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { AssetAllocation, Holding, Security } from '../models';
import accounts from './data/accounts.json';
import cashBalances from './data/cash-balances.json';
import holdings from './data/holdings.json';
import industries from './data/industries.json';
import sectors from './data/sectors.json';
import securities from './data/securities.json';
import { mockDb } from './mockDb';

const { getUser, setUser, getTokenValue, setTokenValue, removeToken } = mockDb;

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

const getAccountHoldings = (accountId: string): Array<Holding> => {
  return holdings.filter((holding) => holding.accountId === accountId);
};

const getAccountCashBalance = (accountId: string): number => {
  const cashBalance = cashBalances.find(
    (cashBalance) => cashBalance.id === accountId
  );
  return cashBalance ? cashBalance.balance : 0;
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

    const email = getTokenValue(accessToken);
    if (!email) {
      return res(
        ctx.errors([{ message: 'Unauthorized', errorType: 'Unauthorized' }])
      );
    }

    const existingUser = getUser(email);
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

    const existingUser = getUser(credentials.email);
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
    setTokenValue(accessToken, existingUser.email);

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
    const { userInfo: requestedUser } = req.variables;

    const existingUser = getUser(requestedUser.email);
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

    const createdUser = setUser(requestedUser);
    if (createdUser) {
      const accessToken = uuidv4();
      setTokenValue(accessToken, requestedUser.email);

      const { password, ...user } = createdUser;
      return res(
        ctx.data({
          signUp: {
            user,
            accessToken: accessToken,
          },
        })
      );
    }
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

    const assetAllocations: Array<AssetAllocation> = [
      {
        id: 'technology',
        name: 'Technology',
        value: 8000,
        percentage: 0.8,
        children: [
          {
            id: 'computer-hardware',
            name: 'Computer Hardware',
            value: 800,
            percentage: 0.2,
          },
          {
            id: 'application-software',
            name: 'Application Software',
            value: 7200,
            percentage: 0.4,
          },
          {
            id: 'semiconductors',
            name: 'Semiconductors',
            value: 7200,
            percentage: 0.3,
          },
          {
            id: 'communication-equipment',
            name: 'Communication Equipment',
            value: 7200,
            percentage: 0.1,
          },
        ],
      },
      {
        id: 'financial-services',
        name: 'Financial Services',
        value: 2000,
        percentage: 0.2,
        children: [
          {
            id: 'asset-management',
            name: 'Asset Management',
            value: 800,
            percentage: 0.2,
          },
          {
            id: 'banks',
            name: 'Banks',
            value: 1200,
            percentage: 0.6,
          },
          {
            id: 'insurance',
            name: 'Insurance',
            value: 1200,
            percentage: 0.2,
          },
        ],
      },
    ];

    return res(ctx.data({ assetAllocations }));
  }),
];
