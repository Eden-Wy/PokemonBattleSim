import Joi from 'joi';

export const battleValidation = Joi.object({
  username: Joi.string().required(),
  userPokemon: Joi.string().required(),
  enemyPokemon: Joi.string().required(),
  result: Joi.string().valid('Victory', 'Defeat', 'Draw').required(),
  timestamp: Joi.date().required()
});