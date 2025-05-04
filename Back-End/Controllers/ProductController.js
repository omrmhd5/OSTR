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
    const products = await Product.find({ category: categoryDoc._id }).populate(
      "category",
      "name"
    );
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
    const updatedProductsData = [];

    for (const product of productsData) {
      // Find the category by name
      const categoryDoc = await Category.findOne({ name: product.category });

      if (!categoryDoc) {
        return res
          .status(404)
          .json({ message: `Category '${product.category}' not found.` });
      }

      // Replace the category name with its _id
      const updatedProduct = {
        ...product,
        category: categoryDoc._id,
      };

      updatedProductsData.push(updatedProduct);
    }

    // Insert multiple products into the database
    const addedProducts = await Product.insertMany(updatedProductsData);

    res.status(201).json({
      message: "Products added successfully",
      products: addedProducts,
    });
  } catch (error) {
    console.error("Error adding products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    // Validation
    if (!name || !price || !description || !image) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Create a new product matching the schema structure
    const newProduct = new Product({
      name,
      tagline: name, // Using name as tagline for simplicity
      rating: "0",
      reviewCount: "0",
      price,
      description,
      photos: [
        {
          src: image,
        },
      ],
      colors: [
        {
          name: "Default",
          hex: "#000000",
          ring: "ring-black",
        },
      ],
      reviews: [],
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error while creating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};

const addCustomProduct = async (req, res) => {
  try {
    const { name, price, description, photos, colors, category, quantities } =
      req.body;

    // Validation
    if (
      !name ||
      !price ||
      !description ||
      !photos ||
      !colors ||
      !category ||
      !quantities
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Create a new product matching the schema structure
    const newProduct = new Product({
      name,
      tagline: name,
      rating: "0",
      reviewCount: "0",
      price,
      description,
      photos,
      colors,
      category,
      reviews: [],
      quantities, // Add quantities for different sizes
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating custom product:", error);
    res
      .status(500)
      .json({ message: "Server error while creating custom product" });
  }
};

module.exports = {
  getAllProducts,
  getProductByID,
  getProductsByCategory,
  addProducts,
  addProduct,
  deleteProduct,
  addCustomProduct,
};
