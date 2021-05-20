import { graphql, GraphQLRequest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
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
            id: 'brokerage-account',
            name: 'Brokerage Account',
          },
          {
            id: 'retirement-account',
            name: 'Retirement Account',
          },
          {
            id: 'jennys-college-fund',
            name: "Jenny's College Fund",
          },
        ],
      })
    );
  }),
];
