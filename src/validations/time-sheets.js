import Joi from 'joi';

const validations = (req, res, next) => {
  const schema = Joi.object({
    tasks: Joi.array().items().required(),
    totalHours: Joi.number(),
    status: Joi.string().valid('active', 'inactive').required(),
    startDate: Joi.date().less('now').required(),
    endDate: Joi.date().greater('now').required(),
    employeeId: Joi.string().required(),
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
  validations,
};
