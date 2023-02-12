import { Request, Response, NextFunction } from 'express';
import UserService from '../services/loginService';

export async function loginController(request: Request, response: Response, next: NextFunction) {
  try {
    const { email, password } = request.body;
    const token = await UserService({ email, password });

    if (!token) return response.status(401).json({ message: 'Incorrect email or password' });

    return response.status(200).json(token);
  } catch (err) {
    next(err);
  }
}

export async function userRoleController(request: Request, response: Response) {
  const { role } = request.body.user;
  return response.status(200).json({ role });
}
