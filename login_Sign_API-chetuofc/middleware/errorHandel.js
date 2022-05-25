const customErrorHandler = require("../errors/customErrorHandler");

const errorHandle = (err, req, res, next) => {
  let statuscode = 500;
  let data = {
    message: "internal message error 6",
    originalError: err,
  };

  if (err instanceof customErrorHandler) {
    statuscode = err.status;
    data = {
      status: err.status,
      message: err.message,
    };
  }
  res.status(statuscode).json(data);
};
module.exports = errorHandle;
