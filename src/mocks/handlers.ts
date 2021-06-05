import { graphql, GraphQLRequest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { mockDb } from './mockDb';

const { getUser, setUser, getTokenValue, setTokenValue, removeToken } = mockDb;

const AccountId = {
  BrokerageAccount: 'brokerage-account',
  RetirementAccount: 'retirement-account',
  JennysCollegeFund: 'jennys-college-fund',
};

const NetWorthInfo = {
  [AccountId.BrokerageAccount]: {
    __typename: 'NetWorthInfo',
    id: AccountId.BrokerageAccount,
    netWorth: 14500.12,
    investments: 11000.12,
    cash: 3500.0,
  },
  [AccountId.RetirementAccount]: {
    __typename: 'NetWorthInfo',
    id: AccountId.RetirementAccount,
    netWorth: 10000.0,
    investments: 8000.0,
    cash: 2000.0,
  },
  [AccountId.JennysCollegeFund]: {
    __typename: 'NetWorthInfo',
    id: AccountId.JennysCollegeFund,
    netWorth: 20000.0,
    investments: 16000.0,
    cash: 4000.0,
  },
};

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
    return res(
      ctx.data({
        accounts: [
          {
            __typename: 'Account',
            id: AccountId.BrokerageAccount,
            name: 'Brokerage Account',
          },
          {
            __typename: 'Account',
            id: AccountId.RetirementAccount,
            name: 'Retirement Account',
          },
          {
            __typename: 'Account',
            id: AccountId.JennysCollegeFund,
            name: "Jenny's College Fund",
          },
        ],
      })
    );
  }),

  /** get net worth */
  graphql.query('GetNetWorth', (req, res, ctx) => {
    const { accountId } = req.variables;
    return res(
      ctx.data({
        netWorthInfo: NetWorthInfo[accountId],
      })
    );
  }),
];
