import Joi from 'joi';

const validationCreate = (req, res, next) => {
  const schema = Joi.object({
    description: Joi.string().min(3).max(50).required(),
    workedHours: Joi.number().min(1).required(),
    projectId: Joi.string().required(),
    date: Joi.date().required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }

  return next();
};

export default {
  validationCreate,
};
