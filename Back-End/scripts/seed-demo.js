const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const User = require("../Models/User");
const Product = require("../Models/Product");
const Category = require("../Models/Category");
const Order = require("../Models/Order");
const Cart = require("../Models/Cart");
const Wishlist = require("../Models/Wishlist");

const PRODUCTS_ROOT = path.join(
  __dirname,
  "..",
  "..",
  "Front-End",
  "public",
  "assets",
  "Products",
);
const CATEGORIES = ["Men", "Women", "Kids"];

function pickUri() {
  if (process.argv.includes("--remote")) {
    const remote = process.env.MONGO_URI_REMOTE;
    if (!remote) {
      throw new Error("MONGO_URI_REMOTE is missing from Back-End/.env");
    }
    if (/localhost|127\.0\.0\.1/i.test(remote)) {
      throw new Error("MONGO_URI_REMOTE must not point at localhost");
    }
    return remote;
  }
  return process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ostr-demo";
}

function titleFromFile(file) {
  const base = file.replace(/\.[^.]+$/, "").replace(/\d+$/, "");
  const spaced = base
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function colorFromName(name) {
  const value = name.toLowerCase();
  if (value.includes("black")) {
    return { name: "Black", hex: "#111111", ring: "ring-black" };
  }
  if (value.includes("beige")) {
    return { name: "Beige", hex: "#d6c4a8", ring: "ring-amber-200" };
  }
  if (value.includes("white")) {
    return { name: "White", hex: "#f4f4f5", ring: "ring-gray-200" };
  }
  return { name: "Default", hex: "#1f2937", ring: "ring-gray-700" };
}

function productsFromFolder(category) {
  const dir = path.join(PRODUCTS_ROOT, category);
  const files = fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file));
  const groups = new Map();

  for (const file of files) {
    const key = file
      .replace(/\.[^.]+$/, "")
      .replace(/\d+$/, "")
      .toLowerCase();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(file);
  }

  return [...groups.entries()].map(([key, names], index) => {
    names.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    const label = titleFromFile(names[0]);
    return {
      name: `${label}`,
      tagline: `${label} · ${category}`,
      rating: "4.6",
      reviewCount: "8",
      price: String(149 + ((index * 53) % 650)),
      description: `Demo ${category.toLowerCase()} piece, ${label.toLowerCase()}, from the OSTR catalog.`,
      photos: names.map((name) => ({
        src: `/assets/Products/${category}/${name}`,
      })),
      colors: [colorFromName(key)],
      categoryName: category,
      reviews: [
        {
          user: { name: "Demo Shopper", avatar: "/assets/profileDefault.jpg" },
          rating: 5,
          comment: "Looks just like the photo and the size is true.",
          date: "2026-03-12",
        },
      ],
    };
  });
}

async function main() {
  const uri = pickUri();
  await mongoose.connect(uri);

  await Promise.all([
    User.deleteMany({}),
    Product.deleteMany({}),
    Category.deleteMany({}),
    Order.deleteMany({}),
    Cart.deleteMany({}),
    Wishlist.deleteMany({}),
  ]);

  const categories = {};
  for (const name of CATEGORIES) {
    categories[name] = await Category.create({ name });
  }

  const drafts = CATEGORIES.flatMap((category) => productsFromFolder(category));
  const products = await Product.insertMany(
    drafts.map(({ categoryName, ...product }) => ({
      ...product,
      category: categories[categoryName]._id,
    })),
  );

  const passwordFor = async (plain) => bcrypt.hash(plain, 12);
  const shopper = await User.create({
    name: "Demo Shopper",
    email: "user@user.com",
    password: await passwordFor("user123"),
    role: "user",
  });
  await User.create({
    name: "Demo Admin",
    email: "admin@admin.com",
    password: await passwordFor("admin123"),
    role: "admin",
  });

  const pick = (index) => products[index % products.length];
  const line = (product, quantity) => ({
    productId: product._id,
    name: product.name,
    price: Number(product.price),
    quantity,
  });

  await Order.insertMany([
    {
      userId: shopper._id,
      items: [line(pick(0), 1)],
      total: Number(pick(0).price),
      paymentMethod: "Cash",
      status: "Processing",
    },
    {
      userId: shopper._id,
      items: [line(pick(3), 1), line(pick(6), 2)],
      total: Number(pick(3).price) + Number(pick(6).price) * 2,
      paymentMethod: "Visa",
      status: "Shipped",
    },
    {
      userId: shopper._id,
      items: [line(pick(9), 1)],
      total: Number(pick(9).price),
      paymentMethod: "Cash",
      status: "Delivered",
    },
  ]);

  await Cart.create({
    user: shopper._id,
    products: [
      { product: pick(1)._id, quantity: 1 },
      { product: pick(2)._id, quantity: 2 },
    ],
    totalPrice: Number(pick(1).price) + Number(pick(2).price) * 2,
  });

  await Wishlist.create({
    user: shopper._id,
    products: [pick(4)._id, pick(5)._id, pick(7)._id],
  });

  console.log(
    `Seeded ${products.length} products, 3 categories, shopper, admin, 3 orders, cart, and wishlist`,
  );
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
