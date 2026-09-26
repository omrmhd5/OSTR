const Cart = require("../Models/Cart");
const Product = require("../Models/Product");
const { t } = require("../utils/i18n");

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate(
      "products.product"
    );
    if (!cart) return res.status(404).json({ message: t(req, "errors.cartNotFound") });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: t(req, "errors.server") });
  }
};

// Add product to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    let cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: t(req, "errors.productNotFound") });

    if (!cart) {
      cart = new Cart({
        user: req.user.userId,
        products: [],
        totalPrice: 0,
      });
    }

    const index = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (index > -1) {
      cart.products[index].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    // Update total price
    cart.totalPrice = 0;
    for (let item of cart.products) {
      const prod = await Product.findById(item.product);
      cart.totalPrice += prod.price * item.quantity;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: t(req, "errors.server") });
  }
};

// Update quantity of a product in cart
exports.updateQuantity = async (req, res) => {
  const userId = req.user.userId;
  const { productId, amount } = req.body;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: t(req, "errors.cartNotFound") });

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (productIndex === -1)
      return res.status(404).json({ message: t(req, "errors.cartItemMissing") });

    cart.products[productIndex].quantity = amount;
    if (cart.products[productIndex].quantity < 1)
      cart.products[productIndex].quantity = 1;

    // Update total price
    cart.totalPrice = 0;
    for (let item of cart.products) {
      const prod = await Product.findById(item.product);
      cart.totalPrice += prod.price * item.quantity;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: t(req, "errors.server") });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: t(req, "errors.cartNotFound") });

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );

    // Update total price
    cart.totalPrice = 0;
    for (let item of cart.products) {
      const prod = await Product.findById(item.product);
      cart.totalPrice += prod.price * item.quantity;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: t(req, "errors.server") });
  }
};
