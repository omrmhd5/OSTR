const { t } = require("../utils/i18n");

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: t(req, "errors.adminOnly") });
  }
  next();
};

module.exports = { authorizeAdmin };
