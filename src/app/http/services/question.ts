import { abort } from './../../helpers/error';
import { generateRandomNumber } from './../../helpers/utils';
import { getRepository } from 'typeorm';

import Question from '../../entities/Question';
import { QuestionType } from '../../enums/question';
import products from '../../constant/products';
import UserQuestion from '../../entities/UserQuestion';
import User from '../../entities/User';
import { getProfile } from './profile';

const SCORE_PER_QUESTION = 10;

export const getQuestions = async () => {
  const ranNums = generateRandomNumber(1, 793, 5);

  const questions = await getRepository(Question).createQueryBuilder('').whereInIds(ranNums).getMany();

  const formatRes = questions.map((question) => {
    const data = JSON.parse(question.data);
    switch (question.type) {
      case QuestionType.CHOOSE_PRICE:
        return {
          type: question.type,
          data: {
            product: products[data.product],
            options: data.options.sort(() => Math.random() - 0.5),
          },
        };
      case QuestionType.CHOOSE_PRODUCT:
        return {
          type: question.type,
          data: {
            ...data,
            options: data.options.sort(() => Math.random() - 0.5).map((productId) => products[productId]),
          },
        };
      case QuestionType.SORT_BY_PRICE:
        return {
          type: question.type,
          data: data.sort(() => Math.random() - 0.5).map((productId) => products[productId]),
        };
      case QuestionType.UP_OR_DOWN:
        return {
          type: question.type,
          data: {
            ...data,
            product: products[data.product],
          },
        };
    }
  });

  return formatRes;
};

// Làm nhanh chưa nên viết hết vào 1 file, chưa có transaction;

export const submitQuestion = async (task, user) => {
  const userId = user.id;
  const date = task.date;
  const questions = task.questions;
  let gold = 0;
  let exp = 0;

  const userQuestion = await getRepository(UserQuestion).findOne({
    user_id: userId,
    date,
  });

  let data: any = {
    heart: 4,
    taskFinish: 0,
  };

  if (userQuestion) {
    data = JSON.parse(userQuestion.data);
  }

  if (data.heart == 0) {
    abort(400, 'You run out your try');
  }

  if (questions.length < 3) {
    data.heart = data.heart - 1;
  } else {
    exp = Math.floor(
      questions.reduce((prev, question) => {
        return prev + SCORE_PER_QUESTION * (1 - question.time_answer / question.max_time_answer);
      }, 0),
    );

    if (data.taskFinish == 4) {
      await getRepository(User)
        .createQueryBuilder()
        .update(user.id)
        .set({
          exp: () => `exp + ${exp}`,
        })
        .execute();
    } else {
      data.taskFinish = data.taskFinish + 1;
      gold = questions.length * 10;
      await getRepository(User)
        .createQueryBuilder()
        .update(user.id)
        .set({
          exp: () => `exp + ${exp}`,
          gold: () => `gold + ${gold}`,
        })
        .execute();
    }
  }

  if (userQuestion) {
    await getRepository(UserQuestion).update(userQuestion.id, {
      data: JSON.stringify(data),
    });
  } else {
    await getRepository(UserQuestion)
      .createQueryBuilder()
      .insert()
      .values({
        data: JSON.stringify(data),
        user_id: user.id,
        date,
      })
      .execute();
  }

  const response = await getProfile(user);
  return {
    profile: response,
    gold,
    exp,
  };
};
