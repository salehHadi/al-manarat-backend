const CustomerRequest = require("../models/CustomerReques");
const BigPromise = require("../middleware/bigPromise");
const CustomeError = require("../utils/customeError");

exports.form = BigPromise(async (req, res, next) => {
  const { name, phoneNumber, message } = req.body;

  if (!name || !phoneNumber || phoneNumber.length < 7) {
    return next(
      new CustomeError("the name and phone are required to cotact with you"),
      400
    );
  }
  const customerRequest = await CustomerRequest.create({
    name,
    phoneNumber,
    message,
  });

  res.status(200).json({
    success: true,
    customerRequest,
  });
});

exports.getAllForms = BigPromise(async (req, res, next) => {
  const customerRequests = await CustomerRequest.find({});

  res.status(200).json({
    success: true,
    customerRequests,
  });
});
