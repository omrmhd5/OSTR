const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductByID,
  getProductsByCategory,
  addProduct,
  deleteProduct,
} = require("../Controllers/ProductController");
const { authenticateUser } = require("../Middlewares/authUserMiddleware");
const { authorizeAdmin } = require("../Middlewares/authAdminMiddleware");

router.get("/all", getAllProducts);
router.get("/category", getProductsByCategory);
router.get("/:id", getProductByID);
router.post("/add", authenticateUser, authorizeAdmin, addProduct);
router.delete("/delete/:id", authenticateUser, authorizeAdmin, deleteProduct);

module.exports = router;
