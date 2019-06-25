const express = require("express");
const router = express.Router();
const authContrl = require("../controllers/authController");
router.route("/login").post(authContrl.login);

module.exports = router;
