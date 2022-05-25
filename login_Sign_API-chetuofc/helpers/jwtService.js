const jwt = require("jsonwebtoken");
require("dotenv").config();
class jwtService {
  static jwtSign(
    payload,
    accessSecret = process.env.SECRET_ACCESS_KEY,
    expire = "1h"
  ) {
    return jwt.sign(payload, accessSecret, { expiresIn: expire });
  }
  static jwtRefreshSign(
    payload,
    refreshSecret = process.env.SECRET_REFRESH_KEY,
    expire = "1y"
  ) {
    return jwt.sign(payload, refreshSecret, { expiresIn: expire });
  }
  static jwtverify(token, accessSecret = process.env.SECRET_ACCESS_KEY) {
    return jwt.verify(token, accessSecret);
  }
}

module.exports = jwtService;
