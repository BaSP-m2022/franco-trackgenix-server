import Joi from 'joi';

const validations = (req, res, next) => {
  const schema = Joi.object({
    tasks: Joi.array().items(Joi.object({
      description: Joi.string().min(3).max(50).required(),
      workedHours: Joi.number().min(1).required(),
      projectId: Joi.string().required(),
      date: Joi.date().required(),
    })),
    totalHours: Joi.number(),
    status: Joi.string().valid('active', 'inactive').required(),
    startDate: Joi.date().max('now').required(),
    endDate: Joi.date().min(Joi.ref('startDate')),
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
