const express = require("express");
const {
  createOrder,
  getUserOrders,
} = require("../Controllers/OrderController");
const { authenticateUser } = require("../Middlewares/authUserMiddleware");

const router = express.Router();

router.post("/create", authenticateUser, createOrder);
router.get("/", authenticateUser, getUserOrders);

module.exports = router;
