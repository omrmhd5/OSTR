const express = require("express");
const router = express.Router();
const WishlistController = require("../Controllers/wishlistController");

router.post("/toggle", WishlistController.toggleWishlist);

router.get("/", WishlistController.getWishlist);

module.exports = router;
