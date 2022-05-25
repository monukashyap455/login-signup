const errorHandler = require("../errors/customErrorHandler");

const { signupschema } = require("./validate_schema");
const { loginschema } = require("./validate_schema");
const { updateschema } = require("./validate_schema");

module.exports = {
  userauth: async (req, res, next) => {
    const value = await signupschema.validate(req.body);
    if (value.error) {
      next(errorHandler.validationError(203, value.error.details[0].message));
    } else {
      next();
    }
  },

  loginauth: async (req, res, next) => {
    const value = await loginschema.validate(req.body);
    if (value.error) {
      next(errorHandler.validationError(203, value.error.details[0].message));
    } else {
      next();
    }
  },

  updateauth: async (req, res, next) => {
    const value = await updateschema.validate(req.body);
    if (value.error) {
      next(errorHandler.validationError(203, value.error.details[0].message));
    } else {
      next();
    }
  },
};
