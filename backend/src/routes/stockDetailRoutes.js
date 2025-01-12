const express = require("express");
const {
  getModals,
  getModalById,
  createModal,
  updateModal,
  deleteModal,
  getModalDate,
  createModalList,
  deleteList,
} = require("../controllers/stockDetailController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Định nghĩa các endpoint
router.get("/", authMiddleware, getModals);
router.get("/:id", authMiddleware, getModalById);
router.post("/date", authMiddleware, getModalDate);
router.post("/", authMiddleware, createModal);
router.post("/createList", authMiddleware, createModalList);
router.post("/deleteList", authMiddleware, deleteList);
router.put("/:id", authMiddleware, updateModal);
router.delete("/:id", authMiddleware, deleteModal);

module.exports = router;
