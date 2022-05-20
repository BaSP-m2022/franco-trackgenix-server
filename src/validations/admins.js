import Joi from 'joi';

const createRegisterAdmin = (req, res, next) => {
  const registerSchema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .required(),
    lastName: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(12)
      .pattern(/[a-zA-Z]/)
      .pattern(/[0-9]/)
      .required(),
  });
  const validation = registerSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the validation of the request.',
      error: true,
    });
  }

  return next();
};

export default {
  createRegisterAdmin,
};
