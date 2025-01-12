const Modal = require("../models/stockpicks");
const { Sequelize, Op } = require("sequelize");

const getModals = async (req, res) => {
  try {
    const stockpicks = await Modal.findAll({
      raw: true,
      order: [["date", "DESC"]],
    });
    const formattedModals = stockpicks.map((modal) => ({
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
    const { date, code, field, price, rcm, bsRate, bsCycle, pte, ptb, roe } =
      req.body;

    // Tạo người dùng mới
    const modal = await Modal.create({
      date,
      code,
      field,
      price,
      rcm,
      bsRate,
      bsCycle,
      pte,
      ptb,
      roe,
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
    const { date, code, field, price, rcm, bsRate, bsCycle, pte, ptb, roe } =
      req.body;

    const modal = await Modal.findByPk(id); // Tìm người dùng theo ID
    if (!modal) {
      return res.status(404).json({ error: "Modal not found" });
    }

    // Cập nhật thông tin người dùng
    await modal.update({
      date,
      code,
      field,
      price,
      rcm,
      bsRate,
      bsCycle,
      pte,
      ptb,
      roe,
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

// Orther Controller
const getModalDate = async (req, res) => {
  try {
    const { dateFrom, dateTo, codes, sortBy } = req.body;

    // Tạo điều kiện lọc cho ngày
    let whereCondition = {};

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

    // Thêm điều kiện lọc cho `codes`
    if (codes && Array.isArray(codes) && codes.length > 0) {
      whereCondition.code = {
        [Op.in]: codes,
      };
    }

    // Xử lý điều kiện sắp xếp
    const orderCondition = [];
    if (sortBy && Array.isArray(sortBy)) {
      sortBy.forEach((item) => {
        const [field, direction] = item.split(" ");
        orderCondition.push([
          field,
          direction?.toUpperCase() === "DESC" ? "DESC" : "ASC",
        ]);
      });
    }

    // Truy vấn dữ liệu
    const stockpicks = await Modal.findAll({
      raw: true,
      where: whereCondition,
      order: orderCondition, // Áp dụng sắp xếp
    });

    // Format lại dữ liệu nếu cần
    const formattedModals = stockpicks.map((modal) => ({
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

const createModalList = async (req, res) => {
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
            "field",
            "price",
            "rcm",
            "bsRate",
            "bsCycle",
            "pte",
            "ptb",
            "roe",
          ],
        }
      : {};

    // Thêm dữ liệu mới hoặc cập nhật nếu cần
    const createdModals = await Modal.bulkCreate(stockpickList, options);

    res.status(201).json({
      message: overwrite
        ? "Modal list created/updated successfully"
        : "Modal list created successfully",
      data: createdModals,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Data already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

const getDistinctCodes = async (req, res) => {
  try {
    const distinctCodes = await Modal.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("code")), "code"]],
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
  getModalDate,
  createModalList,
  getDistinctCodes,
  deleteList,
};
