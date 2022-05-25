const express = require("express");
const router = express.Router();
const showuser = require("../controllers/show");
const authenticateToken = require("../middleware/jwtAuth");

router.get("/showall", showuser.showAllUser);
router.get("/showuser/:id", authenticateToken, showuser.showUser);

// Set the user's name to the name provided by the user's request.

module.exports = router;
