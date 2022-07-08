import { Request, Response } from 'express';

import * as authService from '../../services/auth/signIn';
import { APP, Post } from '../../../helpers/decorator';
import { validate } from '../../../helpers/validate';
import * as authSchema from '../../validators/auth/signIn';

@APP('/auth')
export default class SignIn {
  @Post('/sign-in')
  async signIn(req: Request, res: Response): Promise<void> {
    const params = {
      accessToken: req.body.accessToken,
    };

    const formatParams = await validate(authSchema.signIn, params);
    const responseData = await authService.signIn(formatParams);
    res.status(200).send(responseData);
  }
}
