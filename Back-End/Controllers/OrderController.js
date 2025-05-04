const Order = require("../Models/Order");

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
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
};
