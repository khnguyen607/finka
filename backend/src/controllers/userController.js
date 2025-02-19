const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const SALT_ROUNDS = 10;
const SECRET_KEY = process.env.SECRET_KEY;
const User = require("../models/users");
const { sendMail } = require("../utils/sendMail");
// const { User } = require("../config/associations");

// Lấy tất cả người dùng
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      raw: true,
      attributes: {
        exclude: ["password"],
      },
    });
    const formattedUsers = users.map((user) => ({
      ...user,
      password: null,
    }));
    res.status(200).json({
      message: "Users retrieved successfully",
      data: formattedUsers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin người dùng theo ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id); // Tìm người dùng theo ID (Primary Key)

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.password = null;
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password, name, phone, province, role, status } = req.body;

    // Hash mật khẩu
    const hashedPassword = await bcryptjs.hash(password, SALT_ROUNDS);

    // Tạo người dùng mới
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      phone,
      province,
      role,
      status,
    });

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đăng nhập người dùng
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng theo email
    const user = await User.findOne({ where: { email, status: "accept" } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // So sánh mật khẩu đã hash
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Tạo token JWT
    const access_token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      {
        expiresIn: "24h", // Token hết hạn sau 1 giờ
      }
    );

    let ability = [];
    switch (user.role) {
      case "ADMIN":
        ability = [
          {
            action: "manage",
            subject: "all",
          },
        ];
        break;
      default:
        ability = [
          {
            action: "read",
            subject: "ACL",
          },
        ];
        break;
    }
    res.status(200).json({
      message: "Login successful",
      userData: {
        email: user.email,
        name: user.name,
        role: user.role,
        ability: ability,
        id: user.id,
      },
      access_token, // Trả về token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, name, phone, province } = req.body;

    // Kiểm tra nếu thiếu dữ liệu bắt buộc
    if (!email || !password || !name || !phone) {
      return res.status(400).json({
        error: "Thiếu dữ liệu đăng ký",
      });
    }

    // Kiểm tra email đã tồn tại
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        error: "Email đã tồn tại",
      });
    }

    // Hash mật khẩu
    const hashedPassword = await bcryptjs.hash(password, SALT_ROUNDS);

    // Tạo người dùng mới
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      phone,
      province,
      role: "USER",
      status: "pending",
    });

    // Gửi email chất với thống báo đăng ký thành công
    sendMail("newRegisterForUser", email);
    sendMail("newRegisterForAdmin", email);

    // Trả về kết quả thành công
    return res.status(201).json({
      status: "success",
      message: "Đăng ký thành công",
      data: {
        email: user.email,
        name: user.name,
        phone: user.phone,
        province,
      },
    });
  } catch (error) {
    // Trả về lỗi nếu xảy ra sự cố
    return res.status(500).json({
      status: "error",
      error: error.message || "Internal Server Error",
    });
  }
};

// Cập nhật người dùng
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, name, phone, province, role, status } = req.body;

    const user = await User.findByPk(id); // Tìm người dùng theo ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = password
      ? await bcryptjs.hash(password, SALT_ROUNDS)
      : null;

    // Cập nhật thông tin người dùng
    await user.update({
      email,
      ...(password !== null && { password: hashedPassword }),
      name,
      phone,
      province,
      role,
      status,
    });
    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id); // Tìm người dùng theo ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy(); // Xóa người dùng
    res.status(204).send(); // Không trả về dữ liệu
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { ids, status } = req.body;

    // Kiểm tra input
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Danh sách ID không hợp lệ." });
    }
    if (!status) {
      return res.status(400).json({ error: "Trạng thái không được bỏ trống." });
    }

    // Cập nhật trạng thái của người dùng theo danh sách ID
    const updatedUsers = await User.update(
      { status },
      { where: { id: ids } } // Cập nhật tất cả người dùng có ID trong danh sách
    );

    if (!updatedUsers[0]) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy người dùng nào để cập nhật." });
    }

    if (status === "accept") {
      ids.forEach(async (id) => {
        const modal = await User.findByPk(id);
        sendMail("approveForUser", modal.dataValues.email);
      });
    }
    res.status(200).json({
      message: "Cập nhật trạng thái thành công.",
      updatedCount: updatedUsers[0], // Số lượng bản ghi được cập nhật
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật người dùng
const addCodeLiked = async (req, res) => {
  try {
    const { id } = req.params;
    const { codeLiked } = req.body;

    const user = await User.findByPk(id); // Tìm người dùng theo ID
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Cập nhật thông tin người dùng
    await user.update({
      codeLiked,
    });
    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xuất các hàm CRUD
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  register,
  updateUserStatus,
  addCodeLiked,
};
