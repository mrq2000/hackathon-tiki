import { generateRandomNumber } from './../../helpers/utils';
import { getRepository } from 'typeorm';

import Question from '../../entities/Question';
import { QuestionType } from '../../enums/question';
import products from '../../constant/products';

export const createQuestion = async () => {
  const ranNums = generateRandomNumber(1, 1108, 4);

  const questions = await getRepository(Question).createQueryBuilder('').whereInIds(ranNums).getMany();

  const formatRes = questions.map((question) => {
    const data = JSON.parse(question.data);
    switch (question.type) {
      case QuestionType.CHOOSE_PRICE:
        return {
          type: question.type,
          data: {
            product: products[data.product],
            options: data.options,
          },
        };
      case QuestionType.CHOOSE_PRODUCT:
        return {
          type: question.type,
          data: {
            ...data,
            options: data.options.map((productId) => products[productId]),
          },
        };
      case QuestionType.SORT_BY_PRICE:
        return {
          type: question.type,
          data: data.map((productId) => products[productId]),
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
