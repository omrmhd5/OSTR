const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../Models/User");
const { t } = require("../utils/i18n");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: t(req, "errors.invalidEmail") });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: t(req, "errors.userExists") });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: t(req, "errors.invalidEmail") });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: t(req, "errors.invalidCredentials") });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: t(req, "errors.invalidCredentials") });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWTSECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: t(req, "success.login"),
      token,
      role: user.role,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.user.userId;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: t(req, "errors.invalidEmail") });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: t(req, "errors.userNotFound") });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 12);
    }

    await user.save();
    return res
      .status(200)
      .json({ message: t(req, "success.profileUpdated"), user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: t(req, "errors.emailNotFound") });
    }

    user.password = await bcrypt.hash(password, 12);
    await user.save();

    return res.status(200).json({
      code: "passwordUpdated",
      message: t(req, "success.passwordUpdated"),
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login, updateProfile, changePassword };
