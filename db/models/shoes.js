'use strict';

module.exports = (sequelize, DataTypes) => {
  const Shoes = sequelize.define('Shoes', {
    name: DataTypes.STRING,
    price: DataTypes.TEXT,
    imgUrl: DataTypes.STRING,
  }, {});

  Shoes.associate = function(models) {
    // associations can be defined here
  };

  return Shoes;
};
