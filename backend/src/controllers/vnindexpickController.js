const Vnindexpick = require("../models/vnindexpicks");
const { Op } = require("sequelize");

const getVnindexpicks = async (req, res) => {
  try {
    const vnindexpicks = await Vnindexpick.findAll({
      raw: true,
    });
    const formattedVnindexpicks = vnindexpicks.map((modal) => ({
      ...modal,
    }));
    res.status(200).json({
      message: "Vnindexpicks retrieved successfully",
      data: formattedVnindexpicks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVnindexpickById = async (req, res) => {
  try {
    const { id } = req.params;
    const modal = await Vnindexpick.findByPk(id); // Tìm người dùng theo ID (Primary Key)

    if (!modal) {
      return res.status(404).json({ error: "Vnindexpick not found" });
    }

    modal.password = null;
    res.status(200).json({
      message: "Vnindexpick retrieved successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createVnindexpick = async (req, res) => {
  try {
    const { date, point, pl, rcm, bsRate, riskVnindex, riskMacro, pe, pb } =
      req.body;

    // Tạo người dùng mới
    const modal = await Vnindexpick.create({
      date,
      point,
      pl,
      rcm,
      bsRate,
      riskVnindex,
      riskMacro,
      pe,
      pb,
    });

    res.status(201).json({
      message: "Vnindexpick created successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVnindexpick = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, point, pl, rcm, bsRate, riskVnindex, riskMacro, pe, pb } =
      req.body;

    const modal = await Vnindexpick.findByPk(id); // Tìm người dùng theo ID
    if (!modal) {
      return res.status(404).json({ error: "Vnindexpick not found" });
    }

    // Cập nhật thông tin người dùng
    await modal.update({
      date,
      point,
      pl,
      rcm,
      bsRate,
      riskVnindex,
      riskMacro,
      pe,
      pb,
    });
    res.status(200).json({
      message: "Vnindexpick updated successfully",
      data: modal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVnindexpick = async (req, res) => {
  try {
    const { id } = req.params;

    const modal = await Vnindexpick.findByPk(id); // Tìm người dùng theo ID
    if (!modal) {
      return res.status(404).json({ error: "Vnindexpick not found" });
    }

    await modal.destroy(); // Xóa người dùng
    res.status(204).send(); // Không trả về dữ liệu
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVnindexpickDate = async (req, res) => {
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
    const vnindexpicks = await Vnindexpick.findAll({
      raw: true,
      where: whereCondition, // Nếu whereCondition là null, Sequelize sẽ bỏ qua điều kiện lọc.
    });

    const formattedVnindexpicks = vnindexpicks.map((modal) => ({
      ...modal,
    }));

    res.status(200).json({
      message: "Vnindexpicks retrieved successfully",
      data: formattedVnindexpicks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createVnindexpickList = async (req, res) => {
  try {
    const { data, overwrite } = req.body; // Lấy danh sách dữ liệu và cờ ghi đè từ request body

    // Kiểm tra nếu không có dữ liệu hoặc dữ liệu không phải là mảng
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "Invalid or empty data list" });
    }

    // Kiểm tra cờ ghi đè (overwrite)
    const options = overwrite
      ? {
          updateOnDuplicate: [
            "point",
            "pl",
            "rcm",
            "bsRate",
            "riskVnindex",
            "riskMacro",
            "pe",
            "pb",
          ],
        }
      : {};

    // Thêm dữ liệu mới hoặc cập nhật nếu cần
    const createdVnindexpicks = await Vnindexpick.bulkCreate(data, options);

    res.status(201).json({
      message: overwrite
        ? "Vnindexpick list created/updated successfully"
        : "Vnindexpick list created successfully",
      data: createdVnindexpicks,
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
  getVnindexpicks,
  getVnindexpickById,
  createVnindexpick,
  updateVnindexpick,
  deleteVnindexpick,
  getVnindexpickDate,
  createVnindexpickList,
};
