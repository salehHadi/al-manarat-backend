const User = require("../models/User");
const BigPromise = require("../middleware/bigPromise");
const CustomeError = require("../utils/customeError");
const cookieToken = require("../utils/cookieToken");
const mailHelper = require("../utils/mailHelper");

exports.singup = BigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new CustomeError("name, email, password are required", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  cookieToken(user, res);
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
  console.log(email);
  console.log(user);
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
