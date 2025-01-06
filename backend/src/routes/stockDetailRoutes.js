const express = require("express");
const {
  getStockDetails,
  getStockDetailById,
  createStockDetail,
  updateStockDetail,
  deleteStockDetail,
  getStockDetailDate,
  createStockDetailList,
} = require("../controllers/stockDetailController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Định nghĩa các endpoint
router.get("/", authMiddleware, getStockDetails);
router.get("/:id", authMiddleware, getStockDetailById);
router.post("/date", authMiddleware, getStockDetailDate);
router.post("/", authMiddleware, createStockDetail);
router.post("/createList", authMiddleware, createStockDetailList);
router.put("/:id", authMiddleware, updateStockDetail);
router.delete("/:id", authMiddleware, deleteStockDetail);

module.exports = router;
