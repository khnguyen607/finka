const express = require("express");
const {
  getStockpicks,
  getStockpickById,
  createStockpick,
  updateStockpick,
  deleteStockpick,
  getStockpickDate,
  createStockpickList,
  getDistinctCodes,
} = require("../controllers/stockpickController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Định nghĩa các endpoint
router.get("/", authMiddleware, getStockpicks);
router.get("/codes", authMiddleware, getDistinctCodes);
router.get("/:id", authMiddleware, getStockpickById);
router.post("/date", authMiddleware, getStockpickDate);
router.post("/", authMiddleware, createStockpick);
router.post("/createList", authMiddleware, createStockpickList);
router.put("/:id", authMiddleware, updateStockpick);
router.delete("/:id", authMiddleware, deleteStockpick);

module.exports = router;
