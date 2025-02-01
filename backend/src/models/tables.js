const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Tables = sequelize.define(
  "Tables",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "tables",
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

module.exports = Tables;
