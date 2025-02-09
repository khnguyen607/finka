const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Rows = sequelize.define(
  "Rows",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tables", // Liên kết với bảng "Tables"
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    data: {
      type: DataTypes.JSON, // Dữ liệu động được lưu dưới dạng JSON
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    tableName: "rows",
    timestamps: true,
  }
);

module.exports = Rows;