const {
  register,
  login,
  updateProfile,
  changePassword,
} = require("../Controllers/AuthController");
const { getUserInfo } = require("../Controllers/UserController");
const { authenticateUser } = require("../Middlewares/authMiddleware");

const express = require("express");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/updateprofile", authenticateUser, updateProfile);
router.put("/changepassword", changePassword);
router.get("/profile", authenticateUser, getUserInfo);

module.exports = router;
