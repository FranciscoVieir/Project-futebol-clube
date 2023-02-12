import { sign, SignOptions, verify } from 'jsonwebtoken';
import { IUserLogin } from '../interfaces/index';

const secret = process.env.JWT_SECRET || '';
const jwtConfig: SignOptions = {
  expiresIn: '15d',
  algorithm: 'HS256',
};
export function createTokenAuth(data: IUserLogin) {
  const token = sign(data, secret, jwtConfig);
  return token;
}

export function isValidToken(tokenAuth: string) {
  const decoded = verify(tokenAuth, secret);
  return decoded;
}
