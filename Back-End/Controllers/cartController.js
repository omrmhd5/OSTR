const Cart = require("../Models/Cart");
const Product = require("../Models/Product");

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
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
    res.status(500).json({ error: error.message });
  }
};

// Update quantity of a product in cart
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, amount } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (productIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });

    cart.products[productIndex].quantity += amount;
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
    res.status(500).json({ error: error.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

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
    res.status(500).json({ error: error.message });
  }
};
