const Modal = require("../models/tables");
const { Sequelize, Op } = require("sequelize");

const getModals = async (req, res) => {
  try {
    const modals = await Modal.findAll({
      raw: true,
    });
    const formattedModals = modals.map((modal) => ({
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
    const { name, description } = req.body;

    // Tạo người dùng mới
    const modal = await Modal.create({
      name,
      description,
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
    const { name, description } = req.body;

    const modal = await Modal.findByPk(id); // Tìm người dùng theo ID
    if (!modal) {
      return res.status(404).json({ error: "Modal not found" });
    }

    // Cập nhật thông tin người dùng
    await modal.update({
      name,
      description,
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

// Xuất các hàm CRUD
module.exports = {
  getModals,
  getModalById,
  createModal,
  updateModal,
  deleteModal,
};
