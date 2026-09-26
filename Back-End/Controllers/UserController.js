const User = require("../Models/User");
const { t } = require("../utils/i18n");

const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: t(req, "errors.userNotFound") });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: t(req, "errors.somethingWrong") });
  }
};

module.exports = { getUserInfo };
