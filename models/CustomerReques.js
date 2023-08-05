const mongoose = require("mongoose");

const customerRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [4, "please write valid name"],
  },
  phoneNumber: {
    type: Number,
    minlength: [8, "please write valid phone number"],
  },
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CustomerReques", customerRequestSchema);
