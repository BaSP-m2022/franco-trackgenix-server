import Joi from 'joi';

const creation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required()
      .pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
  });
  const validation = superAdminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error',
      data: undefined,
      error: true,
    });
  }

  return next();
};

export default {
  creation,
};
