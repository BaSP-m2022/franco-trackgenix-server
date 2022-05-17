import Joi from 'joi';

const validateCreate = (req, res, next) => {
  const timesheetsSchema = Joi.object({
    tasks: Joi.array().items(Joi.string().min(3)).required(),
    totalHours: Joi.number(),
    checked: Joi.boolean(),
    status: Joi.string(),
    startDate: Joi.date().less('now').required(),
    endDate: Joi.date().greater('now').required(),
    projectId: Joi.string().required(),
    employeeId: Joi.string().required(),
    managerId: Joi.string().required(),
  });

  const validate = timesheetsSchema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: 'There was an error during validation',
    });
  }
  return next();
};

const validateEdit = (req, res, next) => {
  const timesheetsSchema = Joi.object({
    tasks: Joi.array().items(Joi.string().min(3)).required(),
    totalHours: Joi.number(),
    checked: Joi.boolean(),
    status: Joi.string(),
    startDate: Joi.date().less('now').required(),
    endDate: Joi.date().greater('now').required(),
    projectId: Joi.string().required(),
    employeeId: Joi.string().required(),
    managerId: Joi.string().required(),
  });

  const validate = timesheetsSchema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: 'There was an error during validation',
    });
  }
  return next();
};

export default {
  validateCreate,
  validateEdit,
};
