'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Shoes', 'imgUrl', { type: Sequelize.STRING });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Shoes', 'imgUrl');
  }
};
