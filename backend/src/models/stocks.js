const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Stock = sequelize.define(
  "Stock",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    field: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    financialRank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quarter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "stocks",
    timestamps: true, // Tự động thêm createdAt, updatedAt
  }
);

module.exports = Stock;
