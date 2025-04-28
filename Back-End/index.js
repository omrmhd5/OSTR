const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const UserRoute = require("./Routes/UserRoute");
const ProductRoutes = require("./Routes/ProductRoutes");
const CategoryRoutes = require("./Routes/CategoryRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const wishlistRoutes = require("./Routes/wishlistRoutes");
const { authenticateUser } = require("./Middlewares/authMiddleware");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", UserRoute);
app.use("/products", ProductRoutes);
app.use("/category", CategoryRoutes);
app.use("/cart", authenticateUser, cartRoutes);
app.use("/wishlist", authenticateUser, wishlistRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
