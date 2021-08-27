// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
    },
    price: {
      type:DataTypes.DECIMAL,
      allownull:false,
      validate: {
        isDecimal:true
      },
      product_name: {
        type:DataTypes.STRING,
        allowNull:false
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      defaultValue:10,
      allowNull:false,
      validate:{
        isNumeric:true
      }
    },
    category_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }

    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
