const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Config = sequelize.define(
  "Config",
  {
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: true,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "config",
    timestamps: false,
  }
);

module.exports = Config;
