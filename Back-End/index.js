const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const ProductRoutes = require("./Routes/ProductRoutes");
const CategoryRoutes = require("./Routes/CategoryRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/products", ProductRoutes);
app.use("/category", CategoryRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
