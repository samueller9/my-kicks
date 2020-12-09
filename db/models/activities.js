'use strict';

module.exports = (sequelize, DataTypes) => {
  const Activities = sequelize.define('Activities', {
    activity: DataTypes.STRING,
    desc: DataTypes.TEXT,
    imgUrl: DataTypes.STRING,
  }, {});

  Activities.associate = function(models) {
    // associations can be defined here
  };

  return Activities;
};
