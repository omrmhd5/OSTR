const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // Get token from the Authorization header (Bearer token) or cookies (if stored in cookies)
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWTSECRET); // Replace with your secret key

    // Attach the decoded user info to the request object for access in the controller
    req.user = decoded;
    console.log("🚀 ~ authenticateUser ~ decoded:", decoded);

    // Allow the request to continue to the next middleware or controller
    next();
  } catch (error) {
    // If the token is invalid or expired, return a 401 Unauthorized response
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Access denied." });
  }
};

module.exports = { authenticateUser };
