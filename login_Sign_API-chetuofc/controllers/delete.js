const errorHandler = require("../errors/customErrorHandler");
const userModel = require("../models/users");
const refreshModel = require("../models/refreshtoken");

// get the delete page from the api
exports.getDelete = (req, res) => {
  res.json({
    response: "sucess",
  });
};

// delete user from Database
exports.postDeleteUser = async (req, res, next) => {
  const inputusername = req.user.username;

  const data = await userModel.deleteOne({
    userName: inputusername,
  });

  if (data.deletedCount === 0) {
    next(errorHandler.notFound(502, "user id not found"));
  } else {
    res.json({
      userName: inputusername,
      status: "Deleted",
      count: data.deletedCount,
    });
  }
};

// delete multiple users
exports.postDeleteMany = async (req, res, next) => {
  const data = await userModel.deleteMany();
  res.json({
    status: "All user Deleted",
    DeleteUser: data.deletedCount,
  });
};
exports.postDeleteToken = async (req, res, next) => {
  const inputTokenusername = req.user.username;
  const data = await refreshModel.findOneAndRemove({
    userName: inputTokenusername,
  });
  if (data) {
    res.json({
      result: "logout",
    });
  }
};
exports.postdeletealltoken = async (req, res, next) => {
  const data = await refreshModel.deleteMany();
  res.json({
    status: "All Token Deleted",
    DeleteUser: data.deletedCount,
  });
};
