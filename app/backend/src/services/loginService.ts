// AQUI ESTÁ OK, ENTÃO NÃO MEXA!!!!!
import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/users';
import { createTokenAuth } from '../jwt/jwtConfig';

import { IJwtToken, ILogin } from '../interfaces/index';

export default async function login({ email, password }: ILogin): Promise<IJwtToken | undefined> {
  const UserModelData = await UserModel.findOne({ where: { email } });
  // console.log('role da service', UserModelData?.role);

  if (!UserModelData) return undefined;

  const isValidPassword = bcrypt.compareSync(password, UserModelData.password);
  // console.log(isValidPassword, 'passwordServices');

  if (!isValidPassword) return undefined;

  const token = createTokenAuth(UserModelData.dataValues);
  return { token };
}
