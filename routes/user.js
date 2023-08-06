const express = require("express");
const router = express.Router();

const {
  singup,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");

router.route("/singup").post(singup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);

module.exports = router;
