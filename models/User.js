const mongoose = require("mongoose");
const validator = require("validator");
const becrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchem = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    maxlength: [40, "the name should be under 40 charecters"],
  },
  email: {
    type: String,
    required: [true, "please provide an Email"],
    validate: [validator.isEmail, "please provide a correct email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: [8, "minimum length is 8 charecters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "manager", "admin"],
  },
  forgotPasswordToken: String,
  forgotPasswordExpirey: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// encriot password before save it

userSchem.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await becrypt.hash(this.password, 10);
});

// validate password is correct or not

userSchem.methods.isValidatedPassword = async function (userSentPassword) {
  return await becrypt.compare(userSentPassword, this.password);
};

// create and return jwt token
userSchem.methods.getJwtToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// get forgot password token (String)
userSchem.methods.getForgotPasswordToken = function () {
  const forgotToken = crypto.randomBytes(20).toString("hex");

  // getting a hash - make sure to get a hash on backend
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  // time of token
  this.forgotPasswordExpirey = Date.now() + 20 * 60 * 1000;

  return forgotToken;
};

module.exports = mongoose.model("User", userSchem);
