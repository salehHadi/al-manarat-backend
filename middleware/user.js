const User = require("../models/User");
const CustomeError = require("../utils/customeError");
const BigPromise = require("./bigPromise");
const Jwt = require("jsonwebtoken");

exports.isUserLoggedin = BigPromise(async (req, res, next) => {
  const token = req.cookies.token;
  //   || req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return next(new CustomeError("you need to login", 401));
  }

  const decoded = Jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

exports.customeRoll = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(new CustomeError(`this role is for ${roles[0]} only `));
    }
    next();
  };
};
