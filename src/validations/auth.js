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
    role: Joi.string().valid('EMPLOYEE', 'ADMIN', 'SUPERADMIN').required(),
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
export default logIn;
