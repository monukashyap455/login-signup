const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const errorHandler = require("../errors/customErrorHandler");

exports.getsignup = (req, res) => {
  res.json({
    response: "sucess",
  });
};

// Set the user's name to the name provided by the user's request.
exports.postsignup = async (req, res, next) => {
  const password = req.body.password;
  const hashpass = await bcrypt.hash(password, 10);
  // creating user
  let user;
  try {
    user = await userModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      userName: req.body.userName,
      password: hashpass,
      role: req.body.role,
    });
  } catch (err) {
    return next(errorHandler.validationError(406, err.message));
  }
  res.json({ status: "success", user: user });
};
