const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Vnindexpick = sequelize.define(
  "Vnindexpick",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
    point: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    pl: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rcm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bsRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    riskVnindex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    riskMacro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pe: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    pb: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "vnindexpicks",
    timestamps: true, // Tự động thêm createdAt, updatedAt
  }
);

module.exports = Vnindexpick;
