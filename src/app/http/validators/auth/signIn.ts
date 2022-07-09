import * as Joi from 'joi';

export const signIn = Joi.object().keys({
  authCode: Joi.string().required(),
});
