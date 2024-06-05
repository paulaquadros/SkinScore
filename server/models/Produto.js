const { DataTypes } = require('sequelize');
const sequelize = require('../db');

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

module.exports = Produto;
