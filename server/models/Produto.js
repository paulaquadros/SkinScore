const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Review = require('./Review');

const Produto = sequelize.define('Produto', {
  id_produto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ingredientes: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imagem: {
    type: DataTypes.BLOB
  }
}, {
  tableName: 'produto',
  timestamps: false
});

Produto.hasMany(Review, { foreignKey: 'id_produto' });
Review.belongsTo(Produto, { foreignKey: 'id_produto' });

module.exports = Produto;
