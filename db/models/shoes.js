'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shoes extends Model {

    static associate(models) {

    }
  };
  Shoes.init({
    name: DataTypes.STRING,
    price: DataTypes.TEXT,
    comments: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shoes',
  });
  return Shoes;
};
