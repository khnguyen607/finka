const express = require("express");
const {
  getVnindexpicks,
  getVnindexpickById,
  createVnindexpick,
  updateVnindexpick,
  deleteVnindexpick,
  getVnindexpickDate,
  createVnindexpickList,
} = require("../controllers/vnindexpickController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Định nghĩa các endpoint
router.get("/", authMiddleware, getVnindexpicks);
router.get("/:id", authMiddleware, getVnindexpickById);
router.post("/date", authMiddleware, getVnindexpickDate);
router.post("/", authMiddleware, createVnindexpick);
router.post("/createList", authMiddleware, createVnindexpickList);
router.put("/:id", authMiddleware, updateVnindexpick);
router.delete("/:id", authMiddleware, deleteVnindexpick);

module.exports = router;
