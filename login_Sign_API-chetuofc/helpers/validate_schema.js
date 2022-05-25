const joi = require("@hapi/joi");

exports.signupschema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  userName: joi.string().alphanum().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  role: joi.string(),
});

exports.loginschema = joi.object({
  userName: joi.string().alphanum().required(),
  password: joi.string().required(),
});

exports.updateschema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  userName: joi.string().alphanum().required(),
  password: joi.string(),
});
