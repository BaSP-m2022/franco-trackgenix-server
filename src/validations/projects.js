import Joi from 'joi';

const projectValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    status: Joi.string().valid('active', 'inactive'),
    description: Joi.string().min(10).max(100),
    employees: Joi.array().items(Joi.object({
      rate: Joi.number().required().greater(0),
      role: Joi.string().required(),
      employeeId: Joi.string().required(),
    })),
    startDate: Joi.date().less('now').required(),
    endDate: Joi.date().greater('now').optional(),
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
  projectValidation,
};
