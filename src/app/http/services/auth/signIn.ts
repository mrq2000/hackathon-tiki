import { getRepository } from 'typeorm';
import axios from 'axios';
import * as crypto from 'crypto';

import { abort } from '../../../helpers/error';
import * as jwt from '../../../helpers/jwt';

import User from '../../../entities/User';

interface ISignIn {
  authCode: string;
}

const client_key = process.env.TIKI_KEY;
const client_secret = process.env.TIKI_SECRET;

const base64URLEncode = (data) => {
  const base64 = Buffer.from(data, 'utf8').toString('base64');
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const sign = (secret, payload) => {
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return signature;
};

export const signIn = async ({ authCode }: ISignIn) => {
  let user;
  const body = {
    code: authCode,
  };

  const timestamp = new Date().getTime();

  const payload = timestamp + '.' + client_key + '.' + JSON.stringify(body);
  const encodedPayload = base64URLEncode(payload);
  const signature = sign(client_secret, encodedPayload);

  try {
    const response = await axios.post('https://api.tiki.vn/tiniapp-open-api/oauth/auth/token', body, {
      headers: {
        'Content-Type': 'application/json',
        'X-Tiniapp-Client-Id': client_key,
        'X-Tiniapp-Signature': signature,
        'X-Tiniapp-Timestamp': timestamp,
      },
    });

    user = response.data?.data?.customer;
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
