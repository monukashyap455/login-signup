const mongoose = require("mongoose");
const refreshschema = mongoose.Schema(
  {
    userName: {
      type: String,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshTokeN: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const refreshModel = mongoose.model("refreshtokens", refreshschema);
module.exports = refreshModel;
