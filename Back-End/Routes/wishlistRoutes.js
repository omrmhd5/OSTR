const express = require("express");
const router = express.Router();
const WishlistController = require("../Controllers/wishlistController");

// Toggle product in wishlist
router.post("/wishlist/toggle", WishlistController.toggleWishlist);

// Get user's wishlist
router.get("/", WishlistController.getWishlist);

module.exports = router;
