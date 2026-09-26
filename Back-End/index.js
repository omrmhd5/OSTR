const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const UserRoute = require("./Routes/UserRoute");
const ProductRoutes = require("./Routes/ProductRoutes");
const CategoryRoutes = require("./Routes/CategoryRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const wishlistRoutes = require("./Routes/wishlistRoutes");
const orderRoutes = require("./Routes/OrderRoute");
const { authenticateUser } = require("./Middlewares/authUserMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = new Set(
  [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    ...(process.env.CLIENT_URL || "").split(","),
  ]
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean),
);

app.use(express.json());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
  }),
);

app.use("/", UserRoute);
app.use("/products", ProductRoutes);
app.use("/category", CategoryRoutes);
app.use("/cart", authenticateUser, cartRoutes);
app.use("/wishlist", authenticateUser, wishlistRoutes);
app.use("/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on http://0.0.0.0:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
