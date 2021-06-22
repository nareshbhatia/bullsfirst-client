export interface User {
  id: string;
  email: string;
  name: string;
}

export interface UserInfo {
  user: User;
  accessToken: string;
}

export interface SignUpInput {
  email: string;
  name: string;
  password: string;
}
