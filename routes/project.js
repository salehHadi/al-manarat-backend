const express = require("express");
const router = express.Router();

const {
  addProject,
  getAllProjects,
  deletedProject,
} = require("../controller/projectController");
const { isUserLoggedin, customeRole } = require("../middleware/user");

router
  .route("/addproject")
  .post(isUserLoggedin, customeRole("admin"), addProject);
router
  .route("/delete-project/:id")
  .delete(isUserLoggedin, customeRole("admin"), deletedProject);

router.route("/all-project").get(getAllProjects);

module.exports = router;
