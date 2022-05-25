const express = require("express");
const router = express.Router();
const login = require("../controllers/login");
const { loginauth } = require("../helpers/user_validate");
router.get("/login", login.getlogin);

router.post("/login", loginauth, login.postlogin);

module.exports = router;
