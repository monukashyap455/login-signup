const loginmodel = require("../models/users");
const bcrypt = require("bcrypt");
const errorHandler = require("../errors/customErrorHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const refreshModel = require("../models/refreshtoken");
const jwtService = require("../helpers/jwtService");

// get login page
exports.getlogin = (req, res) => {
  res.json({
    response: "sucess",
  });
};

// login post login
exports.postlogin = async (req, res, next) => {
  const InputUserName = req.body.userName;
  const Inputpassword = req.body.password;

  const alreadyToken = await refreshModel.exists({
    userName: InputUserName,
  });
  if (alreadyToken) {
    return next(
      errorHandler.validationError(302, "already Token Exists In data")
    );
  }

  try {
    const loginUser = await loginmodel.findOne({
      userName: InputUserName,
    });
    if (!loginUser) {
      return next(
        errorHandler.validationError(
          203,
          "Please Enter Valid Username & Password"
        )
      );
    } else {
      if (await bcrypt.compare(Inputpassword, loginUser.password)) {
        try {
          // create an access token
          const createAccesstoken = jwtService.jwtSign({
            username: loginUser.userName,
            id: loginUser._id,
          });

          // create the refresh token
          const createRefreshToken = jwtService.jwtRefreshSign({
            username: loginUser.userName,
            id: loginUser._id,
          });

          // storing  token's
          const storeRefreshToken = await refreshModel.create({
            userName: InputUserName,
            accessToken: createAccesstoken,
            refreshTokeN: createRefreshToken,
          });

          res.json({
            user: {
              status: "Loged In",
              loginUser,
              Tokens: {
                accessToken: createAccesstoken,
                refreshTokeN: createRefreshToken,
              },
            },
          });
        } catch (err) {
          return next(errorHandler.validationError(403, err.message));
        }
      } else {
        return next(
          errorHandler.validationError(
            203,
            "Please Enter Valid Username & Password"
          )
        );
      }
    }
  } catch (err) {
    next(errorHandler.validationError(err));
  }
};
