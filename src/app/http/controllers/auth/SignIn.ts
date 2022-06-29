import { Request, Response } from 'express';

import * as authService from '../../services/auth/signIn';
import { APP, Post } from '../../../helpers/decorator';
import { validate } from '../../../helpers/validate';
import * as authSchema from '../../validators/auth/signIn';

@APP('/auth/sign-in')
export default class SignIn {
  @Post('/social')
  async signInBySocial(req: Request, res: Response): Promise<void> {
    const params = {
      providerAccessToken: req.body.providerAccessToken,
      providerName: req.body.providerName,
    };

    const formatParams = await validate(authSchema.signInBySocialSchema, params);
    const responseData = await authService.signInBySocial(formatParams);
    res.status(200).send(responseData);
  }
}
