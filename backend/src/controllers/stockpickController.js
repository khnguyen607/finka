const Stockpick = require("../models/stockpicks");
const { Op } = require("sequelize");

const getStockpicks = async (req, res) => {
  try {
    const stockpicks = await Stockpick.findAll({
      raw: true,
    });
    const formattedStockpicks = stockpicks.map((modal) => ({
      ...modal,
    }));
    res.status(200).json({
      message: "Stockpicks retrieved successfully",
      data: formattedStockpicks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStockpickById = async (req, res) => {
  try {
    const { id } = req.params;
    const modal = await Stockpick.findByPk(id); // Tìm người dùng theo ID (Primary Key)

    if (!modal) {
      return res.status(404).json({ error: "Stockpick not found" });
    }

    modal.password = null;
    res.status(200).json({
      message: "Stockpick retrieved successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStockpick = async (req, res) => {
  try {
    const { date, code, field, price, rcm, bsRate, bsCycle, pte, ptb, roe } =
      req.body;

    // Tạo người dùng mới
    const modal = await Stockpick.create({
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
      message: "Stockpick created successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStockpick = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, code, field, price, rcm, bsRate, bsCycle, pte, ptb, roe } =
      req.body;

    const modal = await Stockpick.findByPk(id); // Tìm người dùng theo ID
    if (!modal) {
      return res.status(404).json({ error: "Stockpick not found" });
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
      message: "Stockpick updated successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStockpick = async (req, res) => {
  try {
    const { id } = req.params;

    const modal = await Stockpick.findByPk(id); // Tìm người dùng theo ID
    if (!modal) {
      return res.status(404).json({ error: "Stockpick not found" });
    }

    await modal.destroy(); // Xóa người dùng
    res.status(204).send(); // Không trả về dữ liệu
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStockpickDate = async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.body;

    // Tạo điều kiện lọc
    let whereCondition = null;
    if (dateFrom && dateTo) {
      whereCondition = {
        date: {
          [Op.between]: [new Date(dateFrom), new Date(dateTo)],
        },
      };
    } else if (dateFrom) {
      whereCondition = {
        date: {
          [Op.gte]: new Date(dateFrom),
        },
      };
    } else if (dateTo) {
      whereCondition = {
        date: {
          [Op.lte]: new Date(dateTo),
        },
      };
    }

    // Truy vấn dữ liệu
    const stockpicks = await Stockpick.findAll({
      raw: true,
      where: whereCondition, // Nếu whereCondition là null, Sequelize sẽ bỏ qua điều kiện lọc.
    });

    const formattedStockpicks = stockpicks.map((modal) => ({
      ...modal,
    }));

    res.status(200).json({
      message: "Stockpicks retrieved successfully",
      data: formattedStockpicks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const createStockpickList = async (req, res) => {
//   try {
//     const stockpickList = req.body; // Danh sách dữ liệu từ request body (array)

//     // Kiểm tra nếu không có dữ liệu hoặc dữ liệu không phải là mảng
//     if (!Array.isArray(stockpickList) || stockpickList.length === 0) {
//       return res.status(400).json({ message: "Invalid or empty data list" });
//     }

//     // Tạo danh sách dữ liệu mới
//     const createdStockpicks = await Stockpick.bulkCreate(stockpickList);

//     res.status(201).json({
//       message: "Stockpick list created successfully",
//       data: createdStockpicks,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const createStockpickList = async (req, res) => {
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
    const createdStockpicks = await Stockpick.bulkCreate(
      stockpickList,
      options
    );

    res.status(201).json({
      message: overwrite
        ? "Stockpick list created/updated successfully"
        : "Stockpick list created successfully",
      data: createdStockpicks,
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
  getStockpicks,
  getStockpickById,
  createStockpick,
  updateStockpick,
  deleteStockpick,
  getStockpickDate,
  createStockpickList,
};