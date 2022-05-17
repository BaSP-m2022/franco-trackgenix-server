import Joi from 'joi';

const validationCreateProject = (req, res, next) => {
  const employeesSchema = Joi.object({
    rate: Joi.number().required().greater(0),
    role: Joi.string().required(),
  });

  const projectValidation = Joi.object({
    name: Joi.string().required().min(3),
    status: Joi.string().valid('active', 'inactive'),
    description: Joi.string().min(10).max(100),
    employees: Joi.array().items(employeesSchema),
    startDate: Joi.date().less('now').required(),
    endDate: Joi.date().greater('now').optional(),
  });
  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      message: 'There was an error during validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  next();
};

export default {
  validationCreateProject,
};
