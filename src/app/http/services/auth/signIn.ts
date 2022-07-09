import { getRepository } from 'typeorm';
import axios from 'axios';

import { abort } from '../../../helpers/error';
import * as jwt from '../../../helpers/jwt';

import User from '../../../entities/User';

interface ISignIn {
  accessToken: string;
}

export const signIn = async ({ accessToken }: ISignIn) => {
  let user;
  try {
    const response = await axios.get('https://api.tiki.vn/v2/me', {
      headers: {
        'x-access-token': `${accessToken}`,
      },
    });

    user = response.data;
  } catch (error) {
    abort(400, 'User not found');
  }

  if (!user?.id) {
    abort(400, 'User not found');
  }

  const userRepository = getRepository(User);

  const isUserExists = await userRepository.findOne(user.id);

  if (!isUserExists) {
    const newUser = userRepository.create({ id: user.id, avatar_url: user.avatar_url, name: user.name });
    await userRepository.save(newUser);
  }

  const backendAccessToken = jwt.generate({ userId: user.id });

  return { backendAccessToken: backendAccessToken, user };
};
