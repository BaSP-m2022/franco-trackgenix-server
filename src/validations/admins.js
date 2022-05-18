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
      .alphanum()
      .pattern(/^(?=.*[a-z])(?=.*\d)/)
      .required(),
  });
  const validation = registerSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request.',
      error: validation.error.details[0].message,
    });
  }

  return next();
};

const editRegisterAdmin = (req, res, next) => {
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
      .alphanum()
      .pattern(/^(?=.*[a-z])(?=.*\d)/)
      .required(),
  });
  const validation = registerSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request.',
      error: validation.error.details[0].message,
    });
  }

  return next();
};

export default {
  createRegisterAdmin,
  editRegisterAdmin,
};
