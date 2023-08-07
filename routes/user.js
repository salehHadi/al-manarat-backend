const express = require("express");
const router = express.Router();

const {
  singup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  userLoggedinDashboard,
  changePassword,
} = require("../controller/userController");
const { isUserLoggedin } = require("../middleware/user");

router.route("/singup").post(singup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/userdashboard").get(isUserLoggedin, userLoggedinDashboard);
router.route("/password/update").post(isUserLoggedin, changePassword);

module.exports = router;
