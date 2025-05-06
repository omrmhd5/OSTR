const Wishlist = require("../Models/Wishlist");
const Product = require("../Models/Product");

exports.toggleWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    const productIndex = wishlist.products.findIndex(
      (p) => p.toString() === productId
    );

    if (productIndex > -1) {
      wishlist.products.splice(productIndex, 1);
    } else {
      wishlist.products.push(productId);
    }

    await wishlist.save();

    await wishlist.populate({
      path: "products",
      select: "name price photos",
    });

    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;

    const wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products",
      select: "name price photos",
    });

    if (!wishlist) {
      return res.status(200).json({ success: true, wishlist: [] });
    }

    res.status(200).json({ success: true, wishlist: wishlist.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
