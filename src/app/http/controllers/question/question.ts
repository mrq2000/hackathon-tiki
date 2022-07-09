import { Request, Response } from 'express';

import * as questionService from '../../services/question';
import { APP, Get, Post } from '../../../helpers/decorator';
import { validate } from '../../../helpers/validate';
import * as queSchema from '../../validators/question';
import auth from '../../middlewares/auth';

@APP('/questions')
export default class Question {
  @Get('/')
  async getQuestions(req: Request, res: Response): Promise<void> {
    const responseData = await questionService.getQuestions();
    res.status(200).send(responseData);
  }

  @Post('/submit', [auth])
  async submitTask(req: Request, res: Response): Promise<void> {
    const task = {
      index: req.body.index,
      questions: req.body.questions,
    };

    const user = req['user'];

    const formatTask = await validate(queSchema.submitQuestion, task);
    const responseData = await questionService.submitQuestion(formatTask, user);
    res.status(200).send(responseData);
  }
}
