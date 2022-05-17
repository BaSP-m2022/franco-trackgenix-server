// import Joi from 'joi';

// const creation = (req, res, next) => {
//   const superAdminValidation = Joi.object({
//     firstName: Joi.string().required().min(3),
//     lastName: Joi.string().required().min(3),
//     email: Joi.string().required()
//       .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.w{2,3})+$/),
//     password: Joi.array().required()
//       .pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
//   });
//   const validation = superAdminValidation.validate(req.body);
//   if (validation.error) {
//     return res.status(400).json({
//       message: 'There was an error',
//       data: validation.error.details[0].message,
//       error: true,
//     });
//   }
//   return next();
// };

// export default {
//   creation,
// };
