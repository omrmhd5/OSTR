const express = require("express");
const router = express.Router();
const WishlistController = require("../Controllers/wishlistController");
const authMiddleware = require("../Middlewares/authMiddleware"); // if you have authentication

// Toggle product in wishlist
router.post(
  "/toggle",
  authMiddleware.authenticateUser,
  WishlistController.toggleWishlist
);

// Get user's wishlist
router.get(
  "/wishlist",
  authMiddleware.authenticateUser,
  WishlistController.getWishlist
);

module.exports = router;
