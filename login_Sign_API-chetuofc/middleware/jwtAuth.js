const jwt = require("jsonwebtoken");
const errorHandler = require("../errors/customErrorHandler");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return next(errorHandler.validationError(401, "Token Missing 10"));
  }

  // verifies secret accress token
  try {
    const { username, id } = await jwt.verify(
      token,
      process.env.SECRET_ACCESS_KEY
    );
    const user = { username, id };
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticateToken;
