import Joi from 'joi';

const now = Date.now();
const more18 = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));

const validateEdit = (req, res, next) => {
  const employeesValidation = Joi.object({
    firstName: Joi.string().min(3).max(50).required,
    lastName: Joi.string().min(3).max(50).required,
    dni: Joi.number().max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.pattern(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/),
    dateOfBirth: Joi.date().max(more18).required(),
  });

  const validation = employeesValidation.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      message: 'there was an error during the validation of the request',
      error: validation.error.details[0].message,
    });
  } else {
    next();
  }
};

export default { validateEdit };
