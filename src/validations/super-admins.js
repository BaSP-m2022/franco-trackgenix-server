import Joi from 'joi';

const superAdmin = (req, res, next) => {
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
      .message('Password must have at least 1 number'),
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
  superAdmin,
};
