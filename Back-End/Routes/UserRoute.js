const {
  register,
  login,
  updateProfile,
  logout,
  changePassword,
} = require("../Controllers/AuthController");
const { authenticateUser } = require("../Middlewares/authMiddleware");

const express = require("express");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/updateprofile/:id", authenticateUser, updateProfile);
router.put("/changepassword/:id", authenticateUser, changePassword);
router.post("/logout", authenticateUser, logout);

module.exports = router;
