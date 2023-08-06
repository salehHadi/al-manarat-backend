const BigPromise = require("../middleware/bigPromise");
const CustomeError = require("../utils/customeError");
const Project = require("../models/Project");
const cloudinary = require("cloudinary").v2;

exports.addProject = BigPromise(async (req, res, next) => {
  const { projectName, status, area, floors, appartements, roofs } = req.body;
  if (!projectName || !status || !area || !floors || !appartements || !roofs) {
    return next(new CustomeError("sorry all feild are required "));
  }

  let imageHolder;

  if (req.files) {
    // the frontend DEV should use photos as a name of the file
    imageHolder = await cloudinary.uploader.upload(
      req.files.photos.tempFilePath,
      {
        folder: "projectImage",
        width: 350,
        crop: "scale",
      }
    );
  }

  const project = await Project.create({
    projectName: projectName,
    status: status,
    area: area,
    floors: floors,
    appartements: appartements,
    roofs: roofs,
    photo: {
      id: imageHolder.public_id,
      secure_url: imageHolder.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    project,
  });
});
