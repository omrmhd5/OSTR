const {
  register,
  login,
  updateProfile,
  changePassword,
} = require("../Controllers/AuthController");
const { getUserInfo } = require("../Controllers/UserController");
const { authenticateUser } = require("../Middlewares/authUserMiddleware");
const { authorizeAdmin } = require("../Middlewares/authAdminMiddleware");

const express = require("express");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/updateprofile", authenticateUser, updateProfile);
router.put("/changepassword", changePassword);
router.get("/profile", authenticateUser, getUserInfo);

router.get("/admin", authenticateUser, authorizeAdmin, (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

module.exports = router;
