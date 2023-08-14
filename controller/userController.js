const User = require("../models/User");
const BigPromise = require("../middleware/bigPromise");
const CustomeError = require("../utils/customeError");
const cookieToken = require("../utils/cookieToken");
const mailHelper = require("../utils/mailHelper");
const crypto = require("crypto");

exports.singup = BigPromise(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!email || !name || !password) {
    return next(new CustomeError("name, email, password are required", 400));
  }

  const user = await User.create({
    name,
    email,
    role,
    password,
  });

  user.password = undefined;
  // cookieToken(user, res);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomeError("email and password are required", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new CustomeError("email or password does not match or exist", 400)
    );
  }

  const isPasswordCorrect = await user.isValidatedPassword(password);

  if (!isPasswordCorrect) {
    return next(
      new CustomeError("email or password does not match or exist", 400)
    );
  }

  cookieToken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logout successfully",
  });
});

exports.forgotPassword = BigPromise(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new CustomeError("we could not find your email", 400));
  }

  const forgotToken = await user.getForgotPasswordToken();

  await user.save({ validateBeforeSave: false });

  const myURL = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${forgotToken}`;
  try {
    await mailHelper({
      email,
      myURL,
    });
    res.status(200).json({
      success: true,
      message: `email sent successfully, check you inbox mail on ${email}`,
    });
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpirey = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new CustomeError("email failed to send", 500));
  }
});

exports.resetPassword = BigPromise(async (req, res, next) => {
  const token = req.params.token;

  const encryptToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: encryptToken,
    forgotPasswordExpirey: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CustomeError("Token is invalid or expried", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new CustomeError("the password & confirm password do not matchs", 400)
    );
  }

  user.password = req.body.password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpirey = undefined;
  await user.save();

  cookieToken(user, res);
});

exports.userLoggedinDashboard = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.changePassword = BigPromise(async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findById(userId).select("+password");

  const isOldPassword = user.isValidatedPassword(req.body.oldPassword);
  if (!isOldPassword) {
    return next(new CustomeError("the password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new CustomeError("the newPassword and confirm password do not match", 401)
    );
  }

  user.password = req.body.newPassword;

  await user.save();

  cookieToken(user, res);
});

exports.getAllUsers = BigPromise(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.deleteUser = BigPromise(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    next(new CustomeError("user not found", 401));
  }

  res.status(200).json({
    success: true,
  });
});
