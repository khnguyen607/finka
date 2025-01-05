const { sequelize } = require("../config/database");

const marketing = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_marketing_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const marketingTeam = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_marketing_team_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const marketingMonth = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_marketing_month_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const marketingTeamMonth = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_marketing_team_month_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sale = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_sale_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const saleTeam = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_sale_team_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const saleMonth = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_sale_month_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const saleTeamMonth = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_sale_team_month_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const bonus = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_bonus_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const bonusMonth = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_bonus_month_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userReview = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_user_review_reports";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const userEliteClub = async (req, res) => {
  try {
    const sql = "SELECT * FROM view_user_elite_club";
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDashboard = async (req, res) => {
  try {
    const { tern } = req.body;
    const sql = `CALL GetDashboard ('${tern}');`;
    const [datas] = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Kết quả của truy vấn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getIncomeDaily = async (req, res) => {
  try {
    // tern: 2024-11
    const { tern } = req.body;
    const sql = `CALL GetIncomeDaily ('${tern}');`;
    const datas = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Dữ liệu chính xác
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getIncomeYear = async (req, res) => {
  try {
    try {
      const sql = "SELECT * FROM view_income_year_reports";
      const [datas] = await sequelize.query(sql);

      res.status(200).json({
        message: "Retrieved successfully",
        data: datas, // Kết quả của truy vấn
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserPromotion = async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.body;
    // const sql = `CALL GetIncomeDaily ('${tern}');`;
    const sql = `CALL GetUserPromotion('${dateFrom}', '${dateTo}')`;
    const datas = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Dữ liệu chính xác
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getSaleMonth = async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.body;
    // const sql = `CALL GetIncomeDaily ('${tern}');`;
    const sql = `CALL GetSaleMonth('${dateFrom}', '${dateTo}')`;
    const datas = await sequelize.query(sql);

    res.status(200).json({
      message: "Retrieved successfully",
      data: datas, // Dữ liệu chính xác
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xuất các hàm controller
module.exports = {
  marketing,
  marketingTeam,
  marketingMonth,
  marketingTeamMonth,

  sale,
  saleTeam,
  saleMonth,
  saleTeamMonth,

  bonus,
  bonusMonth,

  userReview,
  userEliteClub,

  getDashboard,
  getIncomeDaily,
  getIncomeYear,
  getUserPromotion,
  getSaleMonth,
};
