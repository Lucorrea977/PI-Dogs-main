const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_max: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    weight_min: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(1234),
      allowNull: true,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};