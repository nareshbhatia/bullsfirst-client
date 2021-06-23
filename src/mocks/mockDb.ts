import { Storage } from '../utils';
import { DbUser, UserId } from './models';

const USERS_KEY = 'mockDbUsers';
const TOKENS_KEY = 'mockDbTokens';

// The mock database keeps all data in memory. However it is backed by
// localStorage. Anytime a value is written to the in-memory database,
// it is also persisted to localStorage.

// -------------------- Initialize in-memory database --------------------
// users & tokens
const users: Array<DbUser> = Storage.get(USERS_KEY, []);
const tokens: { [token: string]: UserId } = Storage.get(TOKENS_KEY, {});
// -----------------------------------------------------------------------

function getUser(id: string): DbUser | undefined {
  return users.find((user) => user.id === id);
}

function getUserByEmail(email: string): DbUser | undefined {
  return users.find((user) => user.email === email);
}

function createUser(dbUser: DbUser) {
  users.push(dbUser);
  Storage.set(USERS_KEY, users);
}

function getTokenValue(token: string): UserId | undefined {
  return tokens[token];
}

function setTokenValue(token: string, value: UserId) {
  tokens[token] = value;
  Storage.set(TOKENS_KEY, tokens);
}

function removeToken(token: string) {
  delete tokens[token];
  Storage.set(TOKENS_KEY, tokens);
}

export const mockDb = {
  getUser,
  getUserByEmail,
  createUser,
  getTokenValue,
  setTokenValue,
  removeToken,
};
