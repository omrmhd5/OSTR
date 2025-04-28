const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cartController");

// Middleware to protect routes (optional, assuming you have auth implemented)
//const { protect } = require("../middleware/authMiddleware");

//router.use(protect);

// Get user's cart
router.get("/", cartController.getCart);

// Add a product to the cart
router.post("/add", cartController.addToCart);

// Update quantity of a product
router.put("/update-quantity", cartController.updateQuantity);

// Remove a product from cart
router.delete("/remove", cartController.removeFromCart);

module.exports = router;
