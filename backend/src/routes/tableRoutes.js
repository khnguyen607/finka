const express = require("express");
const {
  getModals,
  getModalById,
  createModal,
  updateModal,
  deleteModal,
} = require("../controllers/tableController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Định nghĩa các endpoint
router.get("/", authMiddleware, getModals);
router.get("/:id", authMiddleware, getModalById);
router.post("/", authMiddleware, createModal);
router.put("/:id", authMiddleware, updateModal);
router.delete("/:id", authMiddleware, deleteModal);

module.exports = router;
