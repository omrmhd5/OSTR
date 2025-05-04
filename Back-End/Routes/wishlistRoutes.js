const express = require("express");
const router = express.Router();
const WishlistController = require("../Controllers/wishlistController");

// Toggle product in wishlist
router.post("/toggle", WishlistController.toggleWishlist);

// Get user's wishlist
router.get("/", WishlistController.getWishlist);

module.exports = router;
