const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
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
} = require("../controllers/getReportController");

const router = express.Router();

// Định nghĩa các route
router.get("/marketing", authMiddleware, marketing);
router.get("/marketingTeam", authMiddleware, marketingTeam);
router.get("/marketingMonth", authMiddleware, marketingMonth);
router.get("/marketingTeamMonth", authMiddleware, marketingTeamMonth);

router.get("/sale", authMiddleware, sale);
router.get("/saleTeam", authMiddleware, saleTeam);
router.get("/saleMonth", authMiddleware, saleMonth);
router.get("/saleTeamMonth", authMiddleware, saleTeamMonth);

router.get("/bonus", authMiddleware, bonus);
router.get("/bonusMonth", authMiddleware, bonusMonth);
router.get("/userReview", authMiddleware, userReview);
router.get("/userEliteClub", authMiddleware, userEliteClub);

router.post("/getDashboard", authMiddleware, getDashboard);
router.post("/getIncomeDaily", authMiddleware, getIncomeDaily);
router.post("/getIncomeYear", authMiddleware, getIncomeYear);
router.post("/getUserPromotion", authMiddleware, getUserPromotion);
router.post("/getSaleMonth", authMiddleware, getSaleMonth);

module.exports = router;
