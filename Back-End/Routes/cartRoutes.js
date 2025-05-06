const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cartController");

router.get("/", cartController.getCart);

router.post("/add", cartController.addToCart);

router.put("/update-quantity", cartController.updateQuantity);

router.delete("/remove", cartController.removeFromCart);

module.exports = router;
