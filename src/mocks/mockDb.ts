import { UserInfo } from '../models';
import { Storage } from '../utils';

const USERS_KEY = 'mockDbUsers';
const TOKENS_KEY = 'mockDbTokens';

// The mock database keeps all data in memory. However it is backed by
// localStorage. Anytime a value is written to the in-memory database,
// it is also persisted to localStorage.

// -------------------- Initialize in-memory database --------------------
// users & tokens
const users: { [key: string]: UserInfo } = Storage.get(USERS_KEY, {});
const tokens: { [key: string]: string } = Storage.get(TOKENS_KEY, {});
// -----------------------------------------------------------------------

function getUser(email: string): UserInfo | undefined {
  return users[email];
}

function setUser(userInfo: UserInfo): UserInfo | undefined {
  if (userInfo?.email) {
    users[userInfo.email] = userInfo;
    Storage.set(USERS_KEY, users);
    return userInfo;
  } else {
    return undefined;
  }
}

function getTokenValue(token: string): string | undefined {
  return tokens[token];
}

function setTokenValue(token: string, value: string) {
  tokens[token] = value;
  Storage.set(TOKENS_KEY, tokens);
}

function removeToken(token: string) {
  delete tokens[token];
  Storage.set(TOKENS_KEY, tokens);
}

export const mockDb = {
  getUser,
  setUser,
  getTokenValue,
  setTokenValue,
  removeToken,
};
