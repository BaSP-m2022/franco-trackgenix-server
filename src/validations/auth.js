import Joi from 'joi';

const logIn = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().message('The email is invalid').required(),
    password: Joi.string().min(8)
      .message('Password must have between 8 and 12 characters')
      .max(12)
      .message('Password must have between 8 and 12 characters')
      .pattern(/[a-zA-Z]/)
      .message('Password must have at least 1 letter')
      .pattern(/[0-9]/)
      .message('Password must have at least 1 number')
      .required(),
    role: Joi.string().valid('EMPLOYEE', 'ADMIN', 'SUPER-ADMIN').required(),
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

const signUp = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .message('First Name must have only letters')
      .min(3)
      .message('First Name must have at least 3 characters')
      .max(30)
      .message('First Name must be less than 30 characters')
      .required(),
    lastName: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .message('Last Name must have only letters')
      .min(3)
      .message('Last Name must have at least 3 characters')
      .max(30)
      .message('Last Name must be less than 30 characters')
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
      .pattern(/[a-zA-Z]/)
      .message('Password must have at least 1 letter')
      .pattern(/[0-9]/)
      .message('Password must have at least 1 number')
      .required(),
    dateOfBirth: Joi.date()
      .max((Date.now() - (1000 * 60 * 60 * 24 * 365 * 18)))
      .message('You must be more than 18 years old')
      .required(),
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

export default { logIn, signUp };
