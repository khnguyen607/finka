const StockDetail = require("../models/stockDetails");
const { Op } = require("sequelize");

const getStockDetails = async (req, res) => {
  try {
    const stockpicks = await StockDetail.findAll({
      raw: true,
    });
    const formattedStockDetails = stockpicks.map((modal) => ({
      ...modal,
    }));
    res.status(200).json({
      message: "StockDetails retrieved successfully",
      data: formattedStockDetails,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStockDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const modal = await StockDetail.findByPk(id); // Tìm người dùng theo ID (Primary Key)

    if (!modal) {
      return res.status(404).json({ error: "StockDetail not found" });
    }

    modal.password = null;
    res.status(200).json({
      message: "StockDetail retrieved successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStockDetail = async (req, res) => {
  try {
    const {
      stockCode,
      date,
      price,
      pl,
      rcm,
      bsRate,
      bsCycle,
      pte,
      ptb,
      roe,
      valuationLevel,
      techSignal,
    } = req.body;

    // Tạo người dùng mới
    const modal = await StockDetail.create({
      stockCode,
      date,
      price,
      pl,
      rcm,
      bsRate,
      bsCycle,
      pte,
      ptb,
      roe,
      valuationLevel,
      techSignal,
    });

    res.status(201).json({
      message: "StockDetail created successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStockDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      stockCode,
      date,
      price,
      pl,
      rcm,
      bsRate,
      bsCycle,
      pte,
      ptb,
      roe,
      valuationLevel,
      techSignal,
    } = req.body;

    const modal = await StockDetail.findByPk(id); // Tìm người dùng theo ID
    if (!modal) {
      return res.status(404).json({ error: "StockDetail not found" });
    }

    // Cập nhật thông tin người dùng
    await modal.update({
      stockCode,
      date,
      price,
      pl,
      rcm,
      bsRate,
      bsCycle,
      pte,
      ptb,
      roe,
      valuationLevel,
      techSignal,
    });
    res.status(200).json({
      message: "StockDetail updated successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStockDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const modal = await StockDetail.findByPk(id); // Tìm người dùng theo ID
    if (!modal) {
      return res.status(404).json({ error: "StockDetail not found" });
    }

    await modal.destroy(); // Xóa người dùng
    res.status(204).send(); // Không trả về dữ liệu
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStockDetailDate = async (req, res) => {
  try {
    const { stockCode, dateFrom, dateTo } = req.body;

    // Tạo điều kiện lọc
    let whereCondition = { stockCode }; // Khởi tạo điều kiện với stockCode

    if (dateFrom && dateTo) {
      whereCondition.date = {
        [Op.between]: [new Date(dateFrom), new Date(dateTo)],
      };
    } else if (dateFrom) {
      whereCondition.date = {
        [Op.gte]: new Date(dateFrom),
      };
    } else if (dateTo) {
      whereCondition.date = {
        [Op.lte]: new Date(dateTo),
      };
    }

    // Truy vấn dữ liệu
    const stockpicks = await StockDetail.findAll({
      raw: true,
      where: whereCondition, // Nếu whereCondition là null, Sequelize sẽ bỏ qua điều kiện lọc.
    });

    const formattedStockDetails = stockpicks.map((modal) => ({
      ...modal,
    }));

    res.status(200).json({
      message: "StockDetails retrieved successfully",
      data: formattedStockDetails,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStockDetailList = async (req, res) => {
  try {
    const { stockpickList, overwrite } = req.body; // Lấy danh sách dữ liệu và cờ ghi đè từ request body

    // Kiểm tra nếu không có dữ liệu hoặc dữ liệu không phải là mảng
    if (!Array.isArray(stockpickList) || stockpickList.length === 0) {
      return res.status(400).json({ message: "Invalid or empty data list" });
    }

    // Kiểm tra cờ ghi đè (overwrite)
    const options = overwrite
      ? {
          updateOnDuplicate: [
            "price",
            "pl",
            "rcm",
            "bsRate",
            "bsCycle",
            "pte",
            "ptb",
            "roe",
            "valuationLevel",
            "techSignal",
          ],
        }
      : {};

    // Thêm dữ liệu mới hoặc cập nhật nếu cần
    const createdStockDetails = await StockDetail.bulkCreate(
      stockpickList,
      options
    );

    res.status(201).json({
      message: overwrite
        ? "StockDetail list created/updated successfully"
        : "StockDetail list created successfully",
      data: createdStockDetails,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Data already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Xuất các hàm CRUD
module.exports = {
  getStockDetails,
  getStockDetailById,
  createStockDetail,
  updateStockDetail,
  deleteStockDetail,
  getStockDetailDate,
  createStockDetailList,
};
