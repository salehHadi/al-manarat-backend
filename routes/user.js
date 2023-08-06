const express = require("express");
const router = express.Router();

const { singup, login, logout } = require("../controller/userController");

router.route("/singup").post(singup);
router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
