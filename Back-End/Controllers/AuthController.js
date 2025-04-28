const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../Models/User");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWTSECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    // const { id } = req.params;
    const { name, email, password } = req.body;
    const userId = req.user.userId; // Get the userId from the decoded JWT

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Find user and update their details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 12);
    }

    await user.save();
    return res
      .status(200)
      .json({ message: "Profile updated successfully", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const logout = (req, res) => {
  // If using cookies, clear the token cookie
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.userId; // Get the userId from the decoded JWT
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      console.log(user);
      return res.status(404).json({ message: "User not found" });
    }

    // Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login, updateProfile, logout, changePassword };
