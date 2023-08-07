const express = require("express");
const router = express.Router();

const { addProject } = require("../controller/projectController");
const { isUserLoggedin, customeRoll } = require("../middleware/user");

router
  .route("/addproject")
  .post(isUserLoggedin, customeRoll("admin"), addProject);

module.exports = router;
