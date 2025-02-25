const express = require("express");
const {
  getModals,
  getModalById,
  createModal,
  updateModal,
  deleteModal,
} = require("../controllers/configController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Định nghĩa các endpoint
router.get("/", authMiddleware, getModals);
router.get("/:code", authMiddleware, getModalById);
router.post("/", authMiddleware, createModal);
router.put("/:code", authMiddleware, updateModal);
router.delete("/:code", authMiddleware, deleteModal);

module.exports = router;
