const express = require("express");
const router = express.Router();

const {
  addProject,
  getAllProjects,
} = require("../controller/projectController");
const { isUserLoggedin, customeRole } = require("../middleware/user");

router
  .route("/addproject")
  .post(isUserLoggedin, customeRole("admin"), addProject);

router.route("/all-project").get(getAllProjects);

module.exports = router;
