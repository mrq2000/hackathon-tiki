import { Request, Response } from 'express';

import * as questionService from '../../services/question';
import { APP, Get } from '../../../helpers/decorator';

@APP('/questions')
export default class Question {
  @Get('/')
  async getQuestions(req: Request, res: Response): Promise<void> {
    const responseData = await questionService.getQuestions();
    res.status(200).send(responseData);
  }
}
