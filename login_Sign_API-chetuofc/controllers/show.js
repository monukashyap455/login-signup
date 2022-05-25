const errorHandler = require("../errors/customErrorHandler");
const loginmodel = require("../models/users");

// show all user
exports.showAllUser = async (req, res, next) => {
  try {
    const data = await loginmodel.find({});
    res.json({
      data: data,
    });
  } catch (err) {
    next(errorHandler.validationError(err));
  }
};

// get user by id from login model
exports.showUser = async (req, res, next) => {
  const inputId = req.user.id;
  try {
    const id = inputId;
    const data = await loginmodel.findById(id);
    res.json({
      status: "matched",
      user: data,
    });
  } catch (err) {
    next(errorHandler.validationError("User ID  doesn't Exists!"));
  }
};
