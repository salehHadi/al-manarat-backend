const express = require("express");
const router = express.Router();

const { form, getAllForms } = require("../controller/customerController");

router.route("/form").post(form);
router.route("/all-forms").get(getAllForms);

module.exports = router;
