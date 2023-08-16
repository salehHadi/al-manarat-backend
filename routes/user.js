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
  getAllUsers,
  deleteUser,
} = require("../controller/userController");
const { isUserLoggedin, customeRole } = require("../middleware/user");

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/userdashboard").get(isUserLoggedin, userLoggedinDashboard);
router.route("/password/update").post(isUserLoggedin, changePassword);

// admin Routes
router.route("/singup-user").post(isUserLoggedin, customeRole("admin"), singup);
router
  .route("/delete-user/:id")
  .delete(isUserLoggedin, customeRole("admin"), deleteUser);

// manager Routes
router
  .route("/all-user")
  .get(isUserLoggedin, customeRole("manager"), getAllUsers);

module.exports = router;
