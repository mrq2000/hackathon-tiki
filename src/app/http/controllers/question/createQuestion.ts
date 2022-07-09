import { Request, Response } from 'express';

import * as questionService from '../../services/question';
import { APP, Get } from '../../../helpers/decorator';

@APP('/questions')
export default class Question {
  @Get('/')
  async createQuestion(req: Request, res: Response): Promise<void> {
    const responseData = await questionService.createQuestion();
    res.status(200).send(responseData);
  }
}
