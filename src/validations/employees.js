import Joi from 'joi';

const postValidation = (req, res, next) => {
  const schemaPostValidation = Joi.object({
    firstName: Joi.string()
      .min(3)
      .message('First Name must have at least 3 characters')
      .max(30)
      .message('First Name must be less than 30 characters')
      .regex(/^[a-zA-Z]+$/)
      .message('You can use only letters')
      .required(),
    lastName: Joi.string()
      .min(3)
      .message('Last Name must have at least 3 characters')
      .max(30)
      .message('Last Name must be less than 30 characters')
      .regex(/^[a-zA-Z]+$/)
      .message('You can use only letters')
      .required(),
    dni: Joi.string()
      .regex(/^[0-9]+$/)
      .message('You can use only integers numbers')
      .min(7)
      .message('DNI must have between 7 and 8 characters')
      .max(8)
      .message('DNI must have between 7 and 8 characters')
      .optional(),
    email: Joi.string()
      .email()
      .message('Your email must be a valid email')
      .required(),
    password: Joi.string()
      .min(8)
      .message('Password must have between 8 and 12 characters')
      .max(12)
      .message('Password must have between 8 and 12 characters')
      .pattern(/^(?=.*[a-z])(?=.*\d)/)
      .message('Password must have 1 letter and 1 number')
      .required(),
    dateOfBirth: Joi.date()
      .greater('01-01-1900')
      .message('This date is invalid')
      .less('05-15-2004')
      .message('You must be at least 18 years old')
      .required(),
  });

  const validation = schemaPostValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the validation',
      data: undefined,
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default { postValidation };
