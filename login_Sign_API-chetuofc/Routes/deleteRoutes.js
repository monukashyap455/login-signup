const express = require("express");
const router = express.Router();
const deleteUser = require("../controllers/delete");
const authenticateToken = require("../middleware/jwtAuth");

router.get("/delete", deleteUser.getDelete);
router.post("/deleteuser", authenticateToken, deleteUser.postDeleteUser);
router.post("/deletemany", deleteUser.postDeleteMany);
router.delete("/logout", authenticateToken, deleteUser.postDeleteToken);
router.delete("/deletealltoken", deleteUser.postdeletealltoken);

module.exports = router;
