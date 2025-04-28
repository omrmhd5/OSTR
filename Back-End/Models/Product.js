const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  rating: { type: String, required: true },
  reviewCount: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  photos: [
    {
      src: { type: String, required: true },
    },
  ],
  colors: [
    {
      name: { type: String, required: true },
      hex: { type: String, required: true },
      ring: { type: String, required: true },
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Product", ProductSchema);
