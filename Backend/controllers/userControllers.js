const userModel = require("../models/userModel");
const userService = require("../services/userService");
const jwt = require("../middleware/jwt");
const BlacklistToken = require("../models/blacklistToken");

const { validationResult, cookie } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors) {
    return res.status(400).json({ error: errors.array() });
  }

  const { fullname, email, password } = req.body;
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    return res.status(400).json({ message: "User Already Exists" });
  }
  const user = await userService.createUser({ fullname, email, password });

  const token = jwt.generateToken(user._id);

  res.json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(501).json({ message: "Email Or Password Incorrect" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(501).json({ message: "Email Or Password Incorrect" });
  }

  const token = jwt.generateToken(user._id);
  res.cookie("token", token);
  res.json({ token, user });
};

module.exports.userProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.userLogout = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await BlacklistToken.create({ token });

  res.json({ message: "Logged Out" });
};
