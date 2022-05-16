import Joi from 'joi';

const validationCreate = (req, res, next) => {
  const schema = Joi.object({
    description: Joi.string().min(3).max(50).required(),
    workedHours: Joi.number().min(1).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: undefined,
      error: validation.error.details[0].message,
    });
  }

  return next();
};

const validationUpdate = (req, res, next) => {
  const schema = Joi.object({
    description: Joi.string().min(3).max(50).optional(),
    workedHours: Joi.number().min(1).optional(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error',
      data: undefined,
      error: validation.error.details[0].message,
    });
  }

  return next();
};

export default {
  validationCreate,
  validationUpdate,
};
