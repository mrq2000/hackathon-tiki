import * as Joi from 'joi';

export const signIn = Joi.object().keys({
  accessToken: Joi.string().required(),
});
