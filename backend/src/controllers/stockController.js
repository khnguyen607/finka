const Modal = require("../models/stocks");
const { Sequelize, Op } = require("sequelize");

const getModals = async (req, res) => {
  try {
    const stocks = await Modal.findAll({
      raw: true,
    });
    const formattedModals = stocks.map((modal) => ({
      ...modal,
    }));
    res.status(200).json({
      message: "Modals retrieved successfully",
      data: formattedModals,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getModalById = async (req, res) => {
  try {
    const { id } = req.params;
    const modal = await Modal.findByPk(id); // Tìm người dùng theo ID (Primary Key)

    if (!modal) {
      return res.status(404).json({ error: "Modal not found" });
    }

    modal.password = null;
    res.status(200).json({
      message: "Modal retrieved successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createModal = async (req, res) => {
  try {
    const { code, field, financialRank, quarter } = req.body;

    // Tạo người dùng mới
    const modal = await Modal.create({
      code,
      field,
      financialRank,
      quarter,
    });

    res.status(201).json({
      message: "Modal created successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateModal = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, field, financialRank, quarter } = req.body;

    const modal = await Modal.findByPk(id); // Tìm người dùng theo ID
    if (!modal) {
      return res.status(404).json({ error: "Modal not found" });
    }

    // Cập nhật thông tin người dùng
    await modal.update({
      code,
      field,
      financialRank,
      quarter,
    });
    res.status(200).json({
      message: "Modal updated successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteModal = async (req, res) => {
  try {
    const { id } = req.params;

    const modal = await Modal.findByPk(id); // Tìm người dùng theo ID
    if (!modal) {
      return res.status(404).json({ error: "Modal not found" });
    }

    await modal.destroy(); // Xóa người dùng
    res.status(204).send(); // Không trả về dữ liệu
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Order Controller
const getDistinctCodes = async (req, res) => {
  try {
    const distinctCodes = await Modal.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("code")), "code"],
        [Sequelize.fn("MIN", Sequelize.col("field")), "field"],
      ],
      group: ["code"],
      raw: true,
    });

    res.status(200).json({
      message: "Distinct codes retrieved successfully",
      data: distinctCodes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteList = async (req, res) => {
  try {
    const { ids } = req.body;

    // Kiểm tra input
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Danh sách ID không hợp lệ." });
    }

    // Xóa bản ghi theo danh sách ID
    const deleteCount = await Modal.destroy({
      where: { id: ids },
    });

    if (deleteCount === 0) {
      return res.status(404).json({
        message: "Không tìm thấy bản ghi nào để xóa.",
      });
    }

    res.status(200).json({
      message: "Xóa thành công.",
      deleteCount, // Số lượng bản ghi được xóa
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xuất các hàm CRUD
module.exports = {
  getModals,
  getModalById,
  createModal,
  updateModal,
  deleteModal,
  getDistinctCodes,
  deleteList,
};
