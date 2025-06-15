const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const signinSchema = Joi.object({
  login: Joi.string().required(), // can be username or email
  password: Joi.string().required()
});

module.exports = {
  signupSchema,
  signinSchema
};