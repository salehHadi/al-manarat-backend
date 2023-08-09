const User = require("../models/User");
const CustomeError = require("../utils/customeError");
const BigPromise = require("./bigPromise");
const Jwt = require("jsonwebtoken");

exports.isUserLoggedin = BigPromise(async (req, res, next) => {
  const token = req.cookies.token;
  //   || req.header("Authorization").replace("Bearer ", "");
  console.log(token);

  if (!token) {
    return res.redirect("http://localhost:3000/authentication/sign-in");
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
