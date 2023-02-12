import { Request, Response, NextFunction } from 'express';
import { isValidToken } from '../jwt/jwtConfig';
import { ILogin } from '../interfaces/index';

const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
export async function loginMiddleware(request: Request, response: Response, next: NextFunction) {
  const { email, password }: ILogin = request.body;

  if (!email || !password) {
    return response.status(400).json({ message: 'All fields must be filled' });
  }

  if (!emailRegex.test(email) || password.length < 6) {
    return response.status(401).json({ message: 'Incorrect email or password' });
  }
  return next();
}

export const authToken = (request: Request, response: Response, next: NextFunction) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(400).json({ message: 'Token not found' });
  }

  const decoded = isValidToken(authorization);

  request.body.user = decoded;

  return next();
};
