const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Review = sequelize.define('Review', {
  id_review: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Usuario',
      key: 'id_usuario'
    },
    allowNull: false
  },
  id_produto: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Produto',
      key: 'id_produto'
    },
    allowNull: false
  },
  nota_estrelas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tipo_pele: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alergia: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'review',
  timestamps: false
});

module.exports = Review;