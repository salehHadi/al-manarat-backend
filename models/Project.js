const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: {
    trype: String,
    required: true,
    maxlength: [20, "the name should be under 20 charecters"],
  },
  status: {
    trype: String,
    required: true,
    enum: ["soon", "start selling", "sold out"],
  },
  area: {
    trype: String,
    required: true,
  },
  floors: {
    trype: Number,
    required: true,
    maxlength: [2, "the name should be under 2 charecters"],
  },
  appartements: {
    trype: Number,
    required: true,
    maxlength: [3, "the name should be under 3 charecters"],
  },
  roofs: {
    trype: Number,
    required: true,
    maxlength: [2, "the name should be under 2 charecters"],
  },
  photo: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
