'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Description extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Description.init({
    merchantId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    bulletPoint: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Description',
  });
  return Description;
};