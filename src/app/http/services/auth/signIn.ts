import { getRepository } from 'typeorm';
import axios from 'axios';

import { abort } from '../../../helpers/error';
import * as jwt from '../../../helpers/jwt';
import { UserStatus } from '../../../enums/user';

import User from '../../../entities/User';

interface IUserInfo {
  email: string;
}
const getUserInfoFromGoogle = async (providerAccessToken: string): Promise<IUserInfo> => {
  try {
    const { data } = await axios(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${providerAccessToken}`);

    const { email } = data;
    if (!email) {
      abort(401, 'Fail To Login By Google');
    }
    return { email };
  } catch (e) {
    abort(401, 'Fail To Login By Google');
  }
};

const getUserInfoFromMicrosoft = async (providerAccessToken: string): Promise<IUserInfo> => {
  try {
    const { data } = await axios('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${providerAccessToken}`,
      },
    });
    const { mail: email } = data;
    if (!email) {
      abort(401, 'Fail To Login By Microsoft');
    }

    return { email };
  } catch (e) {
    abort(401, 'Fail To Login By Microsoft');
  }
};

interface ISignInBySocialParams {
  providerAccessToken: string;
  providerName: string;
}

interface ISignInResponse {
  accessToken: string;
}
export const signInBySocial = async ({
  providerAccessToken,
  providerName,
}: ISignInBySocialParams): Promise<ISignInResponse> => {
  let userInfo: IUserInfo;
  if (providerName === 'MICROSOFT') {
    userInfo = await getUserInfoFromMicrosoft(providerAccessToken);
  } else if (providerName === 'GOOGLE') {
    userInfo = await getUserInfoFromGoogle(providerAccessToken);
  } else {
    abort(400, 'Provider not found!');
  }

  const user: any = await getRepository(User).findOne({ email: userInfo.email });

  if (user && user.status == UserStatus.INACTIVE) {
    abort(403, 'Your account was blocked');
  }

  if (!user) {
    const user = await getRepository(User)
      .createQueryBuilder()
      .insert()
      .values({
        email: userInfo.email,
        full_name: userInfo.email.split('@')[0],
      })
      .execute();

    const accessToken = jwt.generate({ userId: user.raw.insertId });
    return { accessToken };
  }

  const accessToken = jwt.generate({ userId: user.id });
  return { accessToken };
};
