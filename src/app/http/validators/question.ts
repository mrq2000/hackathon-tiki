import * as Joi from 'joi';

export const submitQuestion = Joi.object().keys({
  index: Joi.number().required(),
  questions: Joi.array()
    .items(
      Joi.object().keys({
        time_answer: Joi.number().required(),
        max_time_answer: Joi.number().required(),
      }),
    )
    .required(),
});
