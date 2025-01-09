const Stock = require("../models/stocks");
const { Sequelize, Op } = require("sequelize");

const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.findAll({
      raw: true,
    });
    const formattedStocks = stocks.map((modal) => ({
      ...modal,
    }));
    res.status(200).json({
      message: "Stocks retrieved successfully",
      data: formattedStocks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const modal = await Stock.findByPk(id); // Tìm người dùng theo ID (Primary Key)

    if (!modal) {
      return res.status(404).json({ error: "Stock not found" });
    }

    modal.password = null;
    res.status(200).json({
      message: "Stock retrieved successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStock = async (req, res) => {
  try {
    const { code, field, financialRank, quarter } = req.body;

    // Tạo người dùng mới
    const modal = await Stock.create({
      code,
      field,
      financialRank,
      quarter,
    });

    res.status(201).json({
      message: "Stock created successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, field, financialRank, quarter } = req.body;

    const modal = await Stock.findByPk(id); // Tìm người dùng theo ID
    if (!modal) {
      return res.status(404).json({ error: "Stock not found" });
    }

    // Cập nhật thông tin người dùng
    await modal.update({
      code,
      field,
      financialRank,
      quarter,
    });
    res.status(200).json({
      message: "Stock updated successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;

    const modal = await Stock.findByPk(id); // Tìm người dùng theo ID
    if (!modal) {
      return res.status(404).json({ error: "Stock not found" });
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
    const distinctCodes = await Stock.findAll({
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

// Xuất các hàm CRUD
module.exports = {
  getStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
  getDistinctCodes,
};
