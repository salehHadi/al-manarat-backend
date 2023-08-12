const express = require("express");
const router = express.Router();

const { addProject } = require("../controller/projectController");
const { isUserLoggedin, customeRole } = require("../middleware/user");

router
  .route("/addproject")
  .post(isUserLoggedin, customeRole("admin"), addProject);

module.exports = router;
