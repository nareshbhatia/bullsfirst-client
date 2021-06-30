import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  name: Scalars['String'];
  owner: User;
  holdings: Array<Holding>;
  cashBalance: CashBalance;
  orders: Array<Order>;
  transactions: Array<Transaction>;
};

export type AssetAllocation = {
  __typename?: 'AssetAllocation';
  categoryId: Scalars['String'];
  categoryName: Scalars['String'];
  value: Scalars['Float'];
  percentage: Scalars['Float'];
  children?: Maybe<Array<AssetAllocation>>;
};

export type CashBalance = {
  __typename?: 'CashBalance';
  balance: Scalars['Float'];
  account: Account;
};

export type CashTransfer = Transaction & {
  __typename?: 'CashTransfer';
  id: Scalars['ID'];
  account: Account;
  direction: Direction;
  amount: Scalars['Float'];
};

export type Credentials = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type DataPoint = {
  __typename?: 'DataPoint';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export enum Direction {
  In = 'IN',
  Out = 'OUT',
}

export type Holding = {
  __typename?: 'Holding';
  id: Scalars['ID'];
  security: Security;
  quantity: Scalars['Int'];
  account: Account;
  value: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** signs in the user with the specified credentials and returns an access token for future requests */
  signIn: UserInfo;
  /** signs up a new user and returns an access token for future requests */
  signUp: UserInfo;
  /** invalidates the access token that was used to sign in and returns it */
  signOut: Scalars['String'];
};

export type MutationSignInArgs = {
  credentials: Credentials;
};

export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};

export type NetWorthInfo = {
  __typename?: 'NetWorthInfo';
  netWorth: Scalars['Float'];
  investments: Scalars['Float'];
  cash: Scalars['Float'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  side: Side;
  security: Security;
  quantity: Scalars['Int'];
  type: OrderType;
  limitPrice: Scalars['Float'];
  account: Account;
};

export enum OrderType {
  Market = 'MARKET',
  Limit = 'LIMIT',
}

export type Query = {
  __typename?: 'Query';
  /** returns the user identified by the access token in the request header */
  user: User;
  /** returns the accounts owned by the requesting user */
  accounts: Array<Account>;
  /** returns the holdings for the specified account */
  holdings: Array<Holding>;
  /** returns the net worth for the specified account */
  netWorthInfo: NetWorthInfo;
  /** returns the asset allocations for the specified account */
  assetAllocations: Array<AssetAllocation>;
  /** returns the performance for the specified account */
  accountPerformance: Array<Series>;
};

export type QueryHoldingsArgs = {
  accountId: Scalars['ID'];
};

export type QueryNetWorthInfoArgs = {
  accountId: Scalars['ID'];
};

export type QueryAssetAllocationsArgs = {
  accountId: Scalars['ID'];
};

export type QueryAccountPerformanceArgs = {
  accountId: Scalars['ID'];
};

export type Security = {
  __typename?: 'Security';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type Series = {
  __typename?: 'Series';
  name: Scalars['String'];
  data: Array<DataPoint>;
};

export enum Side {
  Buy = 'BUY',
  Sell = 'SELL',
}

export type SignUpInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Trade = Transaction & {
  __typename?: 'Trade';
  id: Scalars['ID'];
  account: Account;
  side: Side;
  security: Security;
  quantity: Scalars['Int'];
  price: Scalars['Float'];
  amount: Scalars['Float'];
};

export type Transaction = {
  id: Scalars['ID'];
  account: Account;
};

export enum TransactionType {
  CashTransfer = 'CASH_TRANSFER',
  Trade = 'TRADE',
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  user: User;
  accessToken: Scalars['String'];
};

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = {
  __typename?: 'Query';
  user: { __typename?: 'User' } & UserFieldsFragment;
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: 'Mutation'; signOut: string };

export type UserFieldsFragment = {
  __typename?: 'User';
  id: string;
  name: string;
  email: string;
};

export type UserInfoFieldsFragment = {
  __typename?: 'UserInfo';
  accessToken: string;
  user: { __typename?: 'User'; id: string; name: string; email: string };
};

export type AccountFieldsFragment = {
  __typename?: 'Account';
  id: string;
  name: string;
};

export type HoldingFieldsFragment = {
  __typename?: 'Holding';
  id: string;
  quantity: number;
  value: number;
  security: {
    __typename?: 'Security';
    id: string;
    name: string;
    price: number;
  };
};

export type NetWorthFieldsFragment = {
  __typename?: 'NetWorthInfo';
  netWorth: number;
  investments: number;
  cash: number;
};

export type AssetAllocationFieldsFragment = {
  __typename?: 'AssetAllocation';
  categoryId: string;
  categoryName: string;
  value: number;
  percentage: number;
  children?: Maybe<
    Array<{
      __typename?: 'AssetAllocation';
      categoryId: string;
      categoryName: string;
      value: number;
      percentage: number;
    }>
  >;
};

export type SeriesFieldsFragment = {
  __typename?: 'Series';
  name: string;
  data: Array<{ __typename?: 'DataPoint'; x: number; y: number }>;
};

export type GetAccountsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAccountsQuery = {
  __typename?: 'Query';
  accounts: Array<{ __typename?: 'Account' } & AccountFieldsFragment>;
};

export type GetHoldingsQueryVariables = Exact<{
  accountId: Scalars['ID'];
}>;

export type GetHoldingsQuery = {
  __typename?: 'Query';
  holdings: Array<{ __typename?: 'Holding' } & HoldingFieldsFragment>;
};

export type GetAssetAllocationsQueryVariables = Exact<{
  accountId: Scalars['ID'];
}>;

export type GetAssetAllocationsQuery = {
  __typename?: 'Query';
  assetAllocations: Array<
    { __typename?: 'AssetAllocation' } & AssetAllocationFieldsFragment
  >;
};

export type GetNetWorthQueryVariables = Exact<{
  accountId: Scalars['ID'];
}>;

export type GetNetWorthQuery = {
  __typename?: 'Query';
  netWorthInfo: { __typename?: 'NetWorthInfo' } & NetWorthFieldsFragment;
};

export type GetAccountPerformanceQueryVariables = Exact<{
  accountId: Scalars['ID'];
}>;

export type GetAccountPerformanceQuery = {
  __typename?: 'Query';
  accountPerformance: Array<{ __typename?: 'Series' } & SeriesFieldsFragment>;
};

export type SignInMutationVariables = Exact<{
  credentials: Credentials;
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  signIn: { __typename?: 'UserInfo' } & UserInfoFieldsFragment;
};

export type SignUpMutationVariables = Exact<{
  signUpInput: SignUpInput;
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  signUp: { __typename?: 'UserInfo' } & UserInfoFieldsFragment;
};

export const UserFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'User' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserFieldsFragment, unknown>;
export const UserInfoFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UserInfoFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'UserInfo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserInfoFieldsFragment, unknown>;
export const AccountFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AccountFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Account' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AccountFieldsFragment, unknown>;
export const HoldingFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'HoldingFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Holding' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'security' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HoldingFieldsFragment, unknown>;
export const NetWorthFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'NetWorthFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'NetWorthInfo' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'netWorth' } },
          { kind: 'Field', name: { kind: 'Name', value: 'investments' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cash' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NetWorthFieldsFragment, unknown>;
export const AssetAllocationFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AssetAllocationFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'AssetAllocation' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'categoryId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'categoryName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'value' } },
          { kind: 'Field', name: { kind: 'Name', value: 'percentage' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'children' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'categoryId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categoryName' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                { kind: 'Field', name: { kind: 'Name', value: 'percentage' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AssetAllocationFieldsFragment, unknown>;
export const SeriesFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'SeriesFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Series' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'data' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'x' } },
                { kind: 'Field', name: { kind: 'Name', value: 'y' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SeriesFieldsFragment, unknown>;
export const GetUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UserFields' },
                },
              ],
            },
          },
        ],
      },
    },
    ...UserFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const SignOutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignOut' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'signOut' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
export const GetAccountsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAccounts' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AccountFields' },
                },
              ],
            },
          },
        ],
      },
    },
    ...AccountFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetAccountsQuery, GetAccountsQueryVariables>;
export const GetHoldingsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetHoldings' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'holdings' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'HoldingFields' },
                },
              ],
            },
          },
        ],
      },
    },
    ...HoldingFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetHoldingsQuery, GetHoldingsQueryVariables>;
export const GetAssetAllocationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAssetAllocations' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assetAllocations' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'AssetAllocationFields' },
                },
              ],
            },
          },
        ],
      },
    },
    ...AssetAllocationFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  GetAssetAllocationsQuery,
  GetAssetAllocationsQueryVariables
>;
export const GetNetWorthDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetNetWorth' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'netWorthInfo' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'NetWorthFields' },
                },
              ],
            },
          },
        ],
      },
    },
    ...NetWorthFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetNetWorthQuery, GetNetWorthQueryVariables>;
export const GetAccountPerformanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAccountPerformance' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountPerformance' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'SeriesFields' },
                },
              ],
            },
          },
        ],
      },
    },
    ...SeriesFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<
  GetAccountPerformanceQuery,
  GetAccountPerformanceQueryVariables
>;
export const SignInDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignIn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'credentials' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Credentials' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signIn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'credentials' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'credentials' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UserInfoFields' },
                },
              ],
            },
          },
        ],
      },
    },
    ...UserInfoFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignUp' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'signUpInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'SignUpInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signUp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'signUpInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'signUpInput' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'UserInfoFields' },
                },
              ],
            },
          },
        ],
      },
    },
    ...UserInfoFieldsFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
