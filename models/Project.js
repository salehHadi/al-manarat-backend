const mongoose = require("mongoose");

// Straunge Problem I couldn't
// add required: [true, "please provide a password"],
// to any of the feilds in the schema

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ["soon", "start selling", "sold out"],
  },
  area: {
    type: String,
  },
  floors: {
    type: Number,
  },
  appartements: {
    type: Number,
  },
  roofs: {
    type: Number,
  },
  photo: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
