const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Stockpick = sequelize.define(
  "Stockpick",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    rcm: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bsRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bsCycle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pte: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    ptb: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    roe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "stockpicks",
    timestamps: true, // Tự động thêm createdAt, updatedAt
  }
);

module.exports = Stockpick;
