const express = require("express");
const router = express.Router();

const { form, getAllForms } = require("../controller/customerController");
const { isUserLoggedin } = require("../middleware/user");

router.route("/form").post(form);
router.route("/all-forms").get(isUserLoggedin, getAllForms);

module.exports = router;
