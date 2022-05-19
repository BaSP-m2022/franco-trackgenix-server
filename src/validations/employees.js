import Joi from 'joi';

const now = Date.now();
const moreThan18 = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));

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
      .pattern(/[a-zA-Z]/)
      .message('Password must have 1 letter')
      .pattern(/[0-9]/)
      .message('Password must have 1 number')
      .required(),
    dateOfBirth: Joi.date()
      .max(moreThan18)
      .message('You must be more than 18 years old')
      .required(),
  });

  const validation = schemaPostValidation.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  } else {
    next();
  }
};

const validateEdit = (req, res, next) => {
  const employeesValidation = Joi.object({
    firstName: Joi.string().min(3).max(50).required,
    lastName: Joi.string().min(3).max(50).required,
    dni: Joi.number().max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.pattern(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/),
    dateOfBirth: Joi.date().max(moreThan18).required(),
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

export default { postValidation, validateEdit };
