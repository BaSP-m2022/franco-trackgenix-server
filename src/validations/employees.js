import Joi from 'joi';

const validateEdit = (req, res, next) => {
  const employeesValidation = Joi.object({
    firstName: Joi.string().min(3).max(50).required,
    lastName: Joi.string().min(3).max(50).required,
    dni: Joi.number().max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.pattern(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/),
    dateOfBirth: Joi.date().less('15-05-2004').greater('15-05-1990').required(),
  });

  const validation = employeesValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'there was an error during the validation of the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default { validateEdit };
