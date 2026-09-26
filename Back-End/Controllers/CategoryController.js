const Category = require("../Models/Category");
const { t } = require("../utils/i18n");

const addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: t(req, "errors.categoryExists") });
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    res
      .status(201)
      .json({ message: t(req, "success.categoryAdded"), category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: t(req, "errors.server") });
  }
};

module.exports = { addCategory };
