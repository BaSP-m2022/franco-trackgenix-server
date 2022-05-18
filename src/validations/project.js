import Joi from 'joi';

const projectValidation = (req, res, next) => {
  const employeesSchema = Joi.object({
    rate: Joi.number().required(),
    role: Joi.string().required(),
  });

  const updateProject = Joi.object({
    name: Joi.string().min(3),
    status: Joi.string().valid('active', 'inactive'),
    description: Joi.string().min(10).max(100),
    employees: Joi.array().items(employeesSchema),
    startDate: Joi.date().less('now'),
    endDate: Joi.date().greater('now'),
  });

  const validation = updateProject.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default projectValidation;
