const express = require("express");
const router = express.Router();
const sign = require("../controllers/signup");
const { userauth } = require("../helpers/user_validate");
router.get("/signup", sign.getsignup);

// Set the user's name to the name provided by the user's request.
router.post("/signup", userauth, sign.postsignup);

module.exports = router;
