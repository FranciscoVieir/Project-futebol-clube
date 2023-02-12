export interface ILogin {
  email: string,
  password: string
}

export interface IJwtToken {
  token: string;
}

export interface IUserLogin {
  id: number,
  username: string;
  role: string;
  email: string;
  password: string;
}
