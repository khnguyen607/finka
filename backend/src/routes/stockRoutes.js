const express = require("express");
const {
  getStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
  getDistinctCodes,
} = require("../controllers/stockController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Định nghĩa các endpoint
router.get("/", authMiddleware, getStocks);
router.get("/codes", authMiddleware, getDistinctCodes);
router.get("/:id", authMiddleware, getStockById);
router.post("/", authMiddleware, createStock);
router.put("/:id", authMiddleware, updateStock);
router.delete("/:id", authMiddleware, deleteStock);

module.exports = router;
