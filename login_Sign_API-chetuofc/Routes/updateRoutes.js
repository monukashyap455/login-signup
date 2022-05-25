const express = require("express");
const router = express.Router();
const updateUser = require("../controllers/update");
const { updateauth } = require("../helpers/user_validate");

//for checking
router.get("/checkupdatestatus", updateUser.getupdate);

// Set the user's name to the name provided by the user's request.
router.put("/updateuser/:id", updateauth, updateUser.postupdate);

// update password user with ID
router.put("/updatepassword/:id", updateUser.updatePassword);

module.exports = router;
