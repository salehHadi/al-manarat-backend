const express = require("express");
const router = express.Router();

const { singup } = require("../controller/userController");

router.route("/singup").post(singup);

module.exports = router;
