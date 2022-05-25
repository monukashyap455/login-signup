const loginmodel = require("../models/users");
const bcrypt = require("bcrypt");
const errorHandler = require("../errors/customErrorHandler");

// show all user
exports.getupdate = async (req, res) => {
  res.json({
    response: "sucess",
  });
};

// get user by id from login model
exports.postupdate = async (req, res, next) => {
  const id = req.params.id;
  let data;
  try {
    data = await loginmodel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
          },
        },
        { new: true }
      )
      .select("-password");
  } catch (err) {
    return next(errorHandler.validationError("User Id not found"));
  }

  // const data2 = await loginmodel.findById(id);

  res.json({
    data: data,
    // updatedData: data2,
  });
};

exports.updatePassword = async (req, res, next) => {
  const id = req.params.id;
  const oldPassword = req.body.oldpassword;
  const newPassword = req.body.newpassword;
  const { password } = await loginmodel.findByIdAndUpdate(id);

  //checking Passwords are same or not, try some another password
  if (oldPassword === newPassword) {
    return next(errorHandler.validationError("try some another password"));
  }

  if (await bcrypt.compare(oldPassword, password)) {
    console.log("password matched");

    bcrypt.hash(newPassword, 10, async (err, hashPassword) => {
      if (err) {
        next(errorHandler.validationError(err.message));
      } else {
        const setnewPassword = await loginmodel.findByIdAndUpdate(id, {
          password: hashPassword,
        });
        res.json({
          data: setnewPassword,
        });
      }
    });
  }
};
