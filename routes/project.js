const express = require("express");
const router = express.Router();

const { addProject } = require("../controller/projectController");

router.route("/addproject").post(addProject);

module.exports = router;
