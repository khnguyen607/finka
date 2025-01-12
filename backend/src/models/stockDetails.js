const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const StockDetail = sequelize.define(
  "StockDetail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stockCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    pl: {
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
    valuationLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    techSignal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "stockdetails",
    timestamps: true, // Tự động thêm createdAt, updatedAt
    indexes: [
      {
        unique: true,
        fields: ["stockCode", "date"],
      },
    ],
  }
);

module.exports = StockDetail;
