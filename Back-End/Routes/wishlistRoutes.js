const express = require("express");
const router = express.Router();
const WishlistController = require("../Controllers/wishlistController");
//const authMiddleware = require("../Middlewares/authMiddleware"); // if you have authentication

// Toggle product in wishlist
router.post(
  "/wishlist/toggle",
  //authMiddleware,
  wishlistController.toggleWishlist
);

// Get user's wishlist
router.get("/wishlist", authMiddleware, wishlistController.getWishlist);

module.exports = router;
