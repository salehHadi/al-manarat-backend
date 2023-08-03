const express = require("express");
const router = express.Router();

const { form } = require("../controller/customerController");

router.route("/form").post(form);

module.exports = router;
