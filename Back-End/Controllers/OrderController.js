const Order = require("../Models/Order");
const { t } = require("../utils/i18n");

const createOrder = async (req, res) => {
  try {
    const { items, total, paymentMethod } = req.body;
    const userId = req.user.userId;

    const newOrder = new Order({
      userId,
      items,
      total,
      paymentMethod,
    });

    await newOrder.save();

    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ success: false, message: t(req, "errors.createOrder") });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ success: false, message: t(req, "errors.fetchOrders") });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
};
