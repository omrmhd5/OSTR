const express = require("express");
const { addCategory } = require("../Controllers/CategoryController");

const router = express.Router();

router.post("/", addCategory);

module.exports = router;
