const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Columns = sequelize.define(
  "Columns",
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
    indexing: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filterType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    defaultValue: {
      type: DataTypes.JSON, // Giá trị mặc định có thể là JSON hoặc null
      allowNull: true,
    },
  },
  {
    tableName: "columns",
    timestamps: true,
  }
);

module.exports = Columns;
