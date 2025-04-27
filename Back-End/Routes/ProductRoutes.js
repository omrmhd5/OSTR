const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductByID,
  getProductsByCategory,
  addProducts,
} = require("../Controllers/ProductController");

router.get("/all", getAllProducts);
router.get("/:id", getProductByID);
router.get("/category", getProductsByCategory);
router.post("/add", addProducts);

module.exports = router;
