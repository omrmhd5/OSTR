const Product = require("../Models/Product");
const Category = require("../Models/Category");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProductByID = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    // .populate("categories", "name")
    // .populate("reviews.user");
    if (!product) {
      return res.status(404).json({ message: "Product Does Not Exist" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProductsByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return res.status(404).json({ message: "Category not found" });
    }
    const products = await Product.find({ category: categoryDoc._id });
    // .populate("categories", "name")
    // .populate("reviews.user");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add products in bulk
const addProducts = async (req, res) => {
  const productsData = req.body; // Assuming products data is passed as an array in the request body

  if (!Array.isArray(productsData) || productsData.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid input. Please provide an array of products." });
  }

  try {
    // Insert multiple products into the database
    const addedProducts = await Product.insertMany(productsData);
    res.status(201).json({
      message: "Products added successfully",
      products: addedProducts,
    });
  } catch (error) {
    console.error("Error adding products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllProducts,
  getProductByID,
  getProductsByCategory,
  addProducts,
};
