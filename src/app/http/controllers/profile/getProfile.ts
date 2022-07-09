import { Request, Response } from 'express';

import * as profileService from '../../services/profile';
import { APP, Get } from '../../../helpers/decorator';
import auth from '../../middlewares/auth';

@APP('/profile')
export default class Profile {
  @Get('/', [auth])
  async getProfile(req: Request, res: Response): Promise<void> {
    const userInfo = req['user'];

    const responseData = await profileService.getProfile(userInfo);
    res.status(200).send(responseData);
  }

  @Get('/rank')
  async getAllProfileByRank(req: Request, res: Response): Promise<void> {
    const responseData = await profileService.getAllProfileByRank();
    res.status(200).send(responseData);
  }
}
