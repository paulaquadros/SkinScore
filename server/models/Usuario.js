const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
  },
  nome_usuario: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  senha: {
    type: DataTypes.STRING,
  },
  tipo_usuario: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

module.exports = Usuario;
