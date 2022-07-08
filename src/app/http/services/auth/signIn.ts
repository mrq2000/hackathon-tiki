import { getRepository } from 'typeorm';
import axios from 'axios';

import { abort } from '../../../helpers/error';
import * as jwt from '../../../helpers/jwt';
import { UserStatus } from '../../../enums/user';

import User from '../../../entities/User';

interface ISignIn {
  accessToken: string;
}

export const signIn = async ({ accessToken }: ISignIn) => {
  let userId;
  try {
    const response = await axios.get('https://openapi.tiki.vn/ecom/v1/customers/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    userId = response.data?.id;
  } catch (error) {
    abort(400, 'User not found');
  }

  if (!userId) {
    abort(400, 'User not found');
  }

  const userRepository = getRepository(User);

  const isUserExists = await userRepository.findOne(userId);

  if (!isUserExists) {
    const newUser = userRepository.create({ id: userId });
    await userRepository.save(newUser);
  }

  const backendAccessToken = jwt.generate({ userId });

  return { backendAccessToken: backendAccessToken };
};
